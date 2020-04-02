/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

func (s *service) CreateLead(ctx context.Context, userID, url string, userAgent string) error {

	if url == "" || url == "/" {
		url = s.store.GetMainPageURL()
	}

	dto := core.Lead{
		UserID:    userID,
		URL:       url,
		UserAgent: userAgent,
	}

	return s.store.SendLead(ctx, &dto)
}
