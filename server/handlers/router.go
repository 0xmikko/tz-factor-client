/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package handlers

import (
	"log"
	"time"

	"github.com/MikaelLazarev/willie/server/errors/sentry"
	"github.com/MikaelLazarev/willie/server/handlers/marketing"
	"github.com/MikaelLazarev/willie/server/helpers"
	"github.com/MikaelLazarev/willie/server/middlewares"
	"github.com/MikaelLazarev/willie/server/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/contrib/gzip"
	"github.com/gin-gonic/gin"
)

func registerRouter(services services.Services) *gin.Engine {
	router := gin.Default()

	// Redirects all request to https
	router.Use(middlewares.HTTPSRedirect())

	// CORS setup
	router.Use(cors.New(cors.Config{
		//AllowAllOrigins:  true,
		AllowOrigins:     []string{
		"http://localhost:3000",
		"http://localhost:8080",
		"https://willie-lean-stage.herokuapp.com",
		 "https://willie.ai",
		 "https://tz-factor.com",
		 "https://tz-factor-app.herokuapp.com",
		 },
		AllowMethods:     []string{"POST", "GET", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// To initialize Sentry's handler, you need to initialize Sentry itself beforehand
	sentry.NewErrorReporter(router)

	// AUTH MIDDLEWARE
	cookieAuthMiddleware := middlewares.CookieAuthHandler(services.MarketingService)

	marketingRouter := router.Group("/m", cookieAuthMiddleware)
	marketing.RegisterController(marketingRouter, services.MarketingService)

	// LANDINGS
	router.GET("/pr/:id", cookieAuthMiddleware, marketing.ServeLanding)

	// Serving admin page
	rootPath := helpers.GetProjectRootDir()

	// This middleware block all calls with url starts with /api or /auth
	router.Use(middlewares.BlockAPICalls)
	router.Use(cookieAuthMiddleware)
	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.Use(static.Serve("/assets/", static.LocalFile(rootPath+"landing/assets", false)))

	// Serving landing pages
	router.GET("/", marketing.ServeMainPage)

	// Serving react app
	router.Use(static.Serve("/", static.LocalFile(rootPath+"client/build", false)))
	router.NoRoute(marketing.ServeReactApp(rootPath + "client/build"))
	return router
}

func StartServer(services services.Services, port string) {

	router := registerRouter(services)

	// Starting server
	log.Println("Starting service at :" + port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal(err)
	}

}
