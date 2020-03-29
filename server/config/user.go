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

type SendgridConfig struct {
	SendgridApiKey string `json:"sendgrid_api_key" validate:"required"`
	ActionDomain   string `json:"action_domain" validate"required"`
}

func GetSendgridConfig() *SendgridConfig {

	var sConfig SendgridConfig
	switch getEnv() {
	default:
		LoadConfigFromJSON("./config/dev_sendgrid.json", &sConfig)

	case PROD:
		sConfig.SendgridApiKey = os.Getenv("SENDGRID_API_KEY")
		sConfig.ActionDomain = os.Getenv("SENDGRID_ACTION_DOMAIN")
	}

	validate(sConfig)
	return &sConfig
}
