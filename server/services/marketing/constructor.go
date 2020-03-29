/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

type service struct {
	store    core.MarketingStoreI
	cache    map[string][]byte
	isCached bool
}

func New(store core.MarketingStoreI) core.MarketingServiceI {

	cs := NewWithoutReload(store)
	cs.Reload(context.TODO())

	return cs
}

func NewWithoutReload(store core.MarketingStoreI) core.MarketingServiceI {

	cs := &service{
		cache: make(map[string][]byte),
		store: store,
	}

	return cs
}
