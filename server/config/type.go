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

func GetConfigType() int {
	configEnv := os.Getenv("ENV")

	switch configEnv {
	case "TEST":
		return TEST

	case "PROD":
		return PROD

	}
	return DEV
}
