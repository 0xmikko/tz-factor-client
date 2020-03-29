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

func Test_store_CreateLandingPage(t *testing.T) {

	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	testLanding := &core.Landing{
		ID: "TEST_ID",
	}

	fakeApiClient.AddResponse(&struct{}{}, nil)

	err := mockMarketingStore.CreateLandingPage(context.TODO(), testLanding)
	assert.NoError(t, err)

	fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/", testLanding)
	assert.Equal(t, fakeApiClient.Count(), 1)

}
