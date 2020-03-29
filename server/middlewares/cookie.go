/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package middlewares

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/errors/sentry"
	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
	"log"
	"strings"
)

func CookieAuthHandler(us core.MarketingServiceI) gin.HandlerFunc {
	return func(c *gin.Context) {

		var userID string
		var err error

		// When browser asks for manifest.json, it doesn't provide cookie!
		if strings.Contains(c.Request.URL.Path, "manifest.json") {
			return
		}

		userID, err = c.Cookie("user_id")
		if err != nil {
			userID = uuid.NewV4().String()
			err := us.CreateLead(context.TODO(), userID, c.Request.URL.Path, c.Request.UserAgent())
			if err != nil {
				log.Println("Cant create user")
				sentry.ReportError(err)
			}
			SetCookieID(c, userID)
		}
		// Set UserID and Role to context
		c.Set("userId", userID)
	}
}

func SetCookieID(c *gin.Context, cookieID string) {
	c.SetCookie("user_id", cookieID, 3600*24*30*12, "", "", false, false)
}
