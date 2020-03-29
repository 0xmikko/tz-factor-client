/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package marketing

import (
	"encoding/json"
	"github.com/MikaelLazarev/willie/server/core"
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/MikaelLazarev/willie/server/middlewares"
	mockmarketingstore "github.com/MikaelLazarev/willie/server/mocks/store/marketing"
	"github.com/MikaelLazarev/willie/server/services/marketing"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

type GoalHandlerTestCase struct {
	name              string
	dto               GoalDTO
	wantCode          int
	wantErrorResponse interface{}
}

// Integration test
func Test_Handlers_Marketing_Goal(t *testing.T) {

	cases := []GoalHandlerTestCase{
		{
			name: "Empty request",
			dto: GoalDTO{
				URL:  "",
				Goal: "",
			},
			wantCode:          http.StatusBadRequest,
			wantErrorResponse: response.Http400WrongRequest,
		},
		{
			name: "Empty URL",
			dto: GoalDTO{
				URL:  "",
				Goal: "wrike",
			},
			wantCode:          http.StatusBadRequest,
			wantErrorResponse: response.Http400WrongRequest,
		},
		{
			name: "Correct parameters",
			dto: GoalDTO{
				URL:  "/test",
				Goal: "test01",
			},
			wantCode:          http.StatusCreated,
			wantErrorResponse: response.Http200OK,
		},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {

			mockMarketingStore := mockmarketingstore.NewMarketingStore()
			mockMarketingService := marketing.NewWithoutReload(mockMarketingStore)

			router := gin.Default()
			cookieAuthMiddleware := middlewares.CookieAuthHandler(mockMarketingService)
			r := router.Group("/m", cookieAuthMiddleware)

			RegisterController(r, mockMarketingService)

			form := url.Values{}
			form.Add("goal", c.dto.Goal)
			form.Add("url", c.dto.URL)

			w := httptest.NewRecorder()
			req, err := http.NewRequest("POST", "/m/goal/", strings.NewReader(form.Encode()))
			assert.NoError(t, err)

			// Setting content-type
			req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

			// Making request
			router.ServeHTTP(w, req)

			results := make(map[string]interface{})
			err = json.Unmarshal(w.Body.Bytes(), &results)
			assert.NoError(t, err)

			assert.Equal(t, c.wantCode, w.Code)
			if w.Code == http.StatusCreated {

				cookies := w.Result().Cookies()

				assert.Equal(t, 1, len(mockMarketingStore.EventGoals))
				assert.EqualValues(t, core.EventGoal{
					Goal:   c.dto.Goal,
					UserID: cookies[0].Value,
					URL:    strings.TrimPrefix(c.dto.URL, "/"),
				}, mockMarketingStore.EventGoals[0])

			} else {
				assert.EqualValues(t, c.wantErrorResponse, results)
			}
		})
	}
}
