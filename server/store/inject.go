/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
package store

import (
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/store/marketing"
)

// GlobalStore contains all repository objects for injecting
type GlobalStore struct {
	MarketingStore core.MarketingStoreI
}

func InjectStore() *GlobalStore {
	return &GlobalStore{
		marketing.New(),
	}

}
