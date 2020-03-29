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

func (s *store) SendLead(ctx context.Context, lead *core.Lead) error {
	return s.client.Request("POST", "/api/landings/lead/", lead, &struct{}{})
}
