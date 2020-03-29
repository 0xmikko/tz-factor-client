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

func (s *service) sendEventOpenPage(ctx context.Context, url string, userID string,
	source string, medium string, campaign string) error {

	if url == "" {
		url = s.store.GetMainPageURL()
	}

	eventOpenPage := core.EventOpenPage{
		URL:         url,
		UserID:      userID,
		UTMSource:   source,
		UTMMedium:   medium,
		UTMCampaign: campaign,
	}

	return s.store.SendEventOpenPage(ctx, &eventOpenPage)
}

func (s *service) RegisterGoal(ctx context.Context, userID, url, goal string) error {

	if url == "" {
		url = s.store.GetMainPageURL()
	}

	eventGoal := core.EventGoal{
		Goal:   goal,
		UserID: userID,
		URL:    url,
	}

	return s.store.SendEventGoal(ctx, &eventGoal)

}
