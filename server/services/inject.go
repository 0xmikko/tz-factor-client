/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package services

import (
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/services/marketing"
	"github.com/MikaelLazarev/willie/server/store"
)

type Services struct {
	MarketingService core.MarketingServiceI
}

func InjectServices(globalStore *store.GlobalStore) *Services {

	landingService := marketing.New(globalStore.MarketingStore)

	return &Services{
		MarketingService: landingService,
	}
}
