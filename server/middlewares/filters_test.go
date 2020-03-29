/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package middlewares

import (
	"github.com/gin-gonic/gin"
	"testing"
)

type AdminOnlyTestCases struct {
	role     string
	wantCode int
}

func testSetRole(role string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("role", role)
	}
}

func Test_Middlewares_AdminOnly(t *testing.T) {

	//cases := []AdminOnlyTestCases{
	//	{
	//		role:     core.ROLE_LEAD,
	//		wantCode: http.StatusForbidden,
	//	},
	//	{
	//		role:     core.ROLE_USER,
	//		wantCode: http.StatusForbidden,
	//	},
	//	{
	//		role:     core.ROLE_ADMIN,
	//		wantCode: http.StatusOK,
	//	},
	//}
	//
	//for _, tc := range cases {
	//	t.Run("Admin  only with "+tc.role, func(t *testing.T) {
	//		w := httptest.NewRecorder()
	//		gin.SetMode(gin.TestMode)
	//		c, r := gin.CreateTestContext(w)
	//
	//		r.GET("/test", testSetRole(tc.role), AdminOnly, func(c *gin.Context) {
	//			c.Status(200)
	//		})
	//		c.Request, _ = http.NewRequest(http.MethodGet, "/test", nil)
	//		r.ServeHTTP(w, c.Request)
	//		assert.Equal(t, tc.wantCode, w.Code)
	//	})
	//
	//}

}
