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

func (s *store) SendSignupInfo(ctx context.Context, signUpInfo *core.SignUpInfo) error {

	err := s.client.Request("POST", "/api/landings/signup/", signUpInfo, &struct{}{})

	return err

}
