/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package config

import (
	"os"
)

type SecurityConfig struct {
	SigningKey  string `json:"signing_key" validate:"required"`
	SentryDSN   string `json:"sentry_dsn" validate:"required"`
	PrivateKey  string `json:"private_key" validate:"required"`
	SSLRedirect string `json:"ssl_redirect" validate:"required"`
}

func GetSecurityConfig() *SecurityConfig {

	var config SecurityConfig

	switch getEnv() {
	default:
		LoadConfigFromJSON("./config/dev_security.json", &config)

	case PROD:
		config.SigningKey = os.Getenv("SECURITY_SIGNING_KEY")
		config.SentryDSN = os.Getenv("SECURITY_SENTRY_DSN")
		config.PrivateKey = os.Getenv("SECURITY_PRIVATE_KEY")
		config.SSLRedirect = os.Getenv("SECURITY_SSL_REDIRECT")
	}

	validate(config)
	return &config
}
