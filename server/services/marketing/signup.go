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

func (s *service) SignUp(ctx context.Context, userID, email, url string) error {

	if url == "" {
		url = s.store.GetMainPageURL()
	}

	signUpInfo := core.SignUpInfo{
		Email:  email,
		UserID: userID,
		URL:    url,
	}

	return s.store.SendSignupInfo(ctx, &signUpInfo)

}
