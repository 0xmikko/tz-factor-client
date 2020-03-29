/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package middlewares

import (
	"github.com/MikaelLazarev/willie/server/helpers"
	"github.com/MikaelLazarev/willie/server/services/marketing"
	marketingstore "github.com/MikaelLazarev/willie/server/store/marketing"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

type TestCookieAuthCase struct {
	name        string
	setCookie   bool
	wantedUsers int
}

func Test_Middlewares_CookieAuthHandler(t *testing.T) {

	cases := []TestCookieAuthCase{
		{
			name:        "user_id cookie is not set up",
			setCookie:   false,
			wantedUsers: 1,
		},
		{
			name:        "user_id cookie is set up",
			setCookie:   true,
			wantedUsers: 0,
		},
	}

	for _, tc := range cases {

		t.Run(tc.name, func(t *testing.T) {

			fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
			mockMarketingStore := marketingstore.NewFromClient(fakeApiClient)
			mockMarketingService := marketing.NewWithoutReload(mockMarketingStore)

			fakeApiClient.AddResponse(&struct{}{}, nil)

			cookieMiddleware := CookieAuthHandler(mockMarketingService)

			w := httptest.NewRecorder()
			gin.SetMode(gin.TestMode)
			c, r := gin.CreateTestContext(w)

			r.GET("/test", cookieMiddleware, func(c *gin.Context) {
				c.Status(http.StatusOK)
			})

			c.Request, _ = http.NewRequest(http.MethodGet, "/test", nil)

			if tc.setCookie {
				c.Request.AddCookie(&http.Cookie{
					Name:    "user_id",
					Value:   "USER_COOKIE",
					Path:    "/",
					Expires: time.Now().Add(time.Hour),
				})
			}

			r.ServeHTTP(w, c.Request)
			assert.Equal(t, http.StatusOK, w.Code)

			cookies := w.Result().Cookies()
			assert.Equal(t, tc.wantedUsers, len(cookies))

			if tc.wantedUsers > 0 {
				assert.Equal(t, 1, fakeApiClient.Count())

				// DTO with structure which should be sent to server
				dto := struct {
					UserID    string `json:"user_id"`
					URL       string `json:"url"`
					UserAgent string `json:"user_agent"`
				}{
					UserID:    cookies[0].Value,
					URL:       "/test",
					UserAgent: "",
				}

				fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/lead/", &dto)
			}

		})
	}
}
