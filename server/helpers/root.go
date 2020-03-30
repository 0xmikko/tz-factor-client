/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package helpers

import "github.com/MikaelLazarev/willie/server/config"

func GetProjectRootDir() string {

	if config.GetConfigType() == config.PROD {
		return "/app/"
	}

	return "/Users/mikhail/Coding/tz-factor-client/"
}
