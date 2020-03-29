/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package marketing

import (
	"github.com/MikaelLazarev/willie/server/config"
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/helpers"
)

type store struct {
	client   helpers.ApiClient
	cache    map[string][]byte
	isCached bool
}

func New() core.MarketingStoreI {

	marketingConfig := config.GetMarketingConfig()
	cs := &store{
		cache:  make(map[string][]byte),
		client: helpers.NewApiCall(marketingConfig.Host, marketingConfig.Key),
	}

	return cs
}

func NewFromClient(client helpers.ApiClient) core.MarketingStoreI {

	cs := &store{
		cache:  make(map[string][]byte),
		client: client,
	}

	return cs
}
