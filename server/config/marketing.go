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

type MarketingConfig struct {
	Host string `json:"host" validate:"required"`
	Key  string `json:"key" validate:"required"`
}

func GetMarketingConfig() *MarketingConfig {

	var eConfig MarketingConfig
	switch getEnv() {
	default:
		LoadConfigFromJSON("./config/dev_marketing.json", &eConfig)

	case PROD:
		eConfig.Host = os.Getenv("MARKETING_HOST")
		eConfig.Key = os.Getenv("MARKETING_HOST_API_KEY")
	}

	validate(eConfig)

	return &eConfig
}
