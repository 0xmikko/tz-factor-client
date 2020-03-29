package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

func (s *service) CreateLandingPage(ctx context.Context, landing *core.Landing) error {
	return s.store.CreateLandingPage(ctx, landing)
}
