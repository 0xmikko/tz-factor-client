///*
// * Lean tool - hypothesis testing application
// *
// * https://github.com/MikaelLazarev/willie/
// * Copyright (c) 2020. Mikhail Lazarev
// *
// */
//
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

type SignupHandlerTestCase struct {
	name              string
	dto               SignUpSendLetterDTO
	wantCode          int
	wantErrorResponse interface{}
}

func Test_Handlers_Landings_SingupHandler(t *testing.T) {

	cases := []SignupHandlerTestCase{
		{
			name: "Empty request",
			dto: SignUpSendLetterDTO{
				Email: "",
				URL:   "",
			},
			wantCode:          http.StatusBadRequest,
			wantErrorResponse: response.Http400WrongRequest,
		},
		{
			name: "Empty URL",
			dto: SignUpSendLetterDTO{
				Email: "io@io.ru",
				URL:   "",
			},
			wantCode:          http.StatusBadRequest,
			wantErrorResponse: response.Http400WrongRequest,
		},
		{
			name: "Correct parameters",
			dto: SignUpSendLetterDTO{
				Email: "test@test.com",
				URL:   "/test",
			},
			wantCode:          http.StatusOK,
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
			form.Add("email", c.dto.Email)
			form.Add("url", c.dto.URL)

			w := httptest.NewRecorder()
			req, err := http.NewRequest("POST", "/m/signup/", strings.NewReader(form.Encode()))
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
				assert.EqualValues(t, core.SignUpInfo{
					Email:  c.dto.Email,
					UserID: cookies[0].Value,
					URL:    strings.TrimPrefix(c.dto.URL, "/"),
				}, mockMarketingStore.EventGoals[0])

			} else {
				assert.EqualValues(t, c.wantErrorResponse, results)
			}
		})
	}
}
