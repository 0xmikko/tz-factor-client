package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

func (s *store) GetLandingByURL(ctx context.Context, url string) (*core.Landing, error) {

	var lp core.Landing

	if err := s.client.Request("GET", "/api/landings/u/"+url+"/", struct{}{}, &lp); err != nil {
		return nil, err
	}

	return &lp, nil
}
