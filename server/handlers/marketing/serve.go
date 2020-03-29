/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package marketing

import (
	"context"
	"errors"
	"github.com/MikaelLazarev/willie/server/errors/sentry"
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"strings"
)

func ServeMainPage(c *gin.Context) {
	// TODO: Add business logic to change Main page
	serveLandingPage(c, "/")
}

func ServeReactApp(appDir string) gin.HandlerFunc {

	return func(c *gin.Context) {

		path := appDir
		content, err := ioutil.ReadFile(path + "/index.html")
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		}
		c.Header("Content-type", "text/html; charset=UTF-8")
		c.Writer.WriteHeader(http.StatusOK)
		c.Writer.Write(content)
	}
}

func ServeLanding(c *gin.Context) {

	url, ok := c.Params.Get("id")
	if !ok || url == "" {
		url = "404"
	}

	serveLandingPage(c, url)
}

func serveLandingPage(c *gin.Context, url string) {

	userID := c.GetString("userId")
	if userID == "" {
		sentry.ReportError(errors.New("Cant get user id in cookie"))
		c.AbortWithStatusJSON(http.StatusInternalServerError, response.Http500InternalError)
		return
	}

	utmSource := c.Request.URL.Query().Get("utm_source")
	utmMedium := c.Request.URL.Query().Get("utm_medium")
	utmCampaign := c.Request.URL.Query().Get("utm_campaign")

	url = strings.TrimPrefix(url, "/")

	content, err := marketingService.ServeLandingPage(context.TODO(), url, userID, c.Request.UserAgent(), utmSource, utmMedium, utmCampaign)
	if err != nil {
		sentry.ReportError(err)
		c.String(http.StatusNotFound, "Page not found")
		return
	}

	c.Header("Content-Type", "text/html; charset=utf-8")
	c.Writer.WriteHeader(http.StatusOK)
	c.Writer.Write(content)
}
