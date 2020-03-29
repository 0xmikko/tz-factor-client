package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

func (s *store) CreateLandingPage(ctx context.Context, lp *core.Landing) error {
	return s.client.Request("POST", "/api/landings/", lp, &struct{}{})
}
