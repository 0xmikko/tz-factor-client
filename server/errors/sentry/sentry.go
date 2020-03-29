/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package sentry

import (
	"errors"
	"fmt"
	"github.com/MikaelLazarev/willie/server/config"
	errors2 "github.com/MikaelLazarev/willie/server/errors"
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"log"
)

var envIsProd bool

func NewErrorReporter(router *gin.Engine) {

	if config.GetConfigType() == config.PROD {
		securityConfig := config.GetSecurityConfig()

		if err := sentry.Init(sentry.ClientOptions{
			Dsn: securityConfig.SentryDSN,
		}); err != nil {
			log.Fatalf("Sentry initialization failed: %v\n", err)
		}

		router.Use(sentrygin.New(sentrygin.Options{}))
		log.Println("Sentry service was started")
		envIsProd = true
	}
}

func ReportError(err error) {

	pae, ok := err.(*errors2.ApiError)
	if ok {
		err = errors.New(fmt.Sprintf("[%s]: %s\nError: %s\n", pae.Module, pae.Problem, pae.Error()))
	}

	ae, ok := err.(errors2.ApiError)
	if ok {
		err = errors.New(fmt.Sprintf("[%s]: %s\nError: %s\n", ae.Module, ae.Problem, ae.Error()))
	}

	if envIsProd {
		sentry.CaptureException(err)
		return
	}
	log.Fatalln(err)
}

func ReportMessage(msg string) {
	if envIsProd {
		sentry.CaptureMessage(msg)
	} else {
		log.Println(msg)
	}
}
