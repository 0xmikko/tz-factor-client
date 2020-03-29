/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package marketing

import (
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/middlewares"
	"github.com/gin-gonic/gin"
)

var marketingService core.MarketingServiceI

func RegisterController(r gin.IRouter, ls core.MarketingServiceI) {

	marketingService = ls

	c := r.Group("/")
	c.POST("/goal/", GoalHandler)
	c.POST("/signup/", Signup)
	c.GET("/reload/", middlewares.AdminOnly, ReloadHandler)
}
