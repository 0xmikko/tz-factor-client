/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package main

import (
	"github.com/MikaelLazarev/willie/server/config"
	"github.com/MikaelLazarev/willie/server/handlers"
	"github.com/MikaelLazarev/willie/server/services"
	"github.com/MikaelLazarev/willie/server/store"
	"github.com/gin-gonic/gin"
	"os"
)

func main() {

	configType := config.GetConfigType()

	// Setup release mode for Gin in production
	if configType == config.PROD {
		gin.SetMode(gin.ReleaseMode)
	}

	globalStore := store.InjectStore()
	// Inject gloablServices
	gloablServices := services.InjectServices(globalStore)

	// Run server
	Port := "8080"
	if os.Getenv("PORT") != "" {
		Port = os.Getenv("PORT")
	}

	// Setup handlers
	handlers.StartServer(*gloablServices, Port)

}
