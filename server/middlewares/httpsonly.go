/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package middlewares

import (
	"github.com/MikaelLazarev/willie/server/config"
	"github.com/gin-gonic/gin"
	"net/http"
)

func HTTPSRedirect() gin.HandlerFunc {

	SSLRedirect := config.GetSecurityConfig().SSLRedirect

	return func(c *gin.Context) {

		if c.Request.Header.Get("X-Forwarded-Proto") == "http" {
			url := c.Request.URL
			url.Scheme = "https"
			url.Host = SSLRedirect

			c.Redirect(http.StatusPermanentRedirect, url.String())
			return
		}

		c.Next()
	}
}
