/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package middlewares

import (
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
)

func AdminOnly(c *gin.Context) {

	role, ok := c.Get("role")

	// If role doesn't setup or not admin return without next middleware
	if !ok || role != "admin" {
		c.AbortWithStatusJSON(http.StatusForbidden, response.Http403Forbidden)
		return
	}

	c.Next()
}

func BlockAPICalls(c *gin.Context) {

	url := c.Request.URL.Path

	if strings.HasPrefix(url, "/api") || strings.HasPrefix(url, "/auth") {
		log.Println("REquest was blocked by Block API Middleware cause it comes to static!")
		c.AbortWithStatusJSON(http.StatusNotFound, response.Http404PageNotFound)
		return
	}

	c.Next()
}

func GrantAdminForTests(c *gin.Context) {
	c.Set("role", "admin")
}
