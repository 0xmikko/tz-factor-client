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

func (s *store) SendEventOpenPage(ctx context.Context, eventOpenPage *core.EventOpenPage) error {
	return s.client.Request("POST", "/api/landings/open/", eventOpenPage, struct{}{})
}

func (s *store) SendEventGoal(ctx context.Context, eventGoal *core.EventGoal) error {

	err := s.client.Request("POST", "/api/landings/goal/", eventGoal, &struct{}{})

	return err

}
