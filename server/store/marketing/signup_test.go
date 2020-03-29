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
	"github.com/MikaelLazarev/willie/server/helpers"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_store_SendSignupInfo(t *testing.T) {

	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	dto := core.SignUpInfo{
		Email:  "email",
		UserID: "userID",
		URL:    "url",
	}

	fakeApiClient.AddResponse(&struct{}{}, nil)

	mockMarketingStore.SendSignupInfo(context.TODO(), &dto)

	fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/signup/", &dto)
	assert.Equal(t, fakeApiClient.Count(), 1)

}
