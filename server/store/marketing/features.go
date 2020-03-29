package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
)

func (s *store) GetFeaturesList(ctx context.Context) ([]core.Feature, error) {

	features := make([]core.Feature, 0)

	err := s.client.Request("GET", "/api/features/", struct{}{}, &features)
	if err != nil {
		return nil, err
	}

	return features, nil

}
