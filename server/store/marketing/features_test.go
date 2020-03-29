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

func Test_store_GetFeaturesList(t *testing.T) {
	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	featuresToSend := []core.Feature{
		{
			ID:          "123",
			Name:        "Feature1",
			Weight:      100,
			IsHeader:    false,
			BasicPlan:   "+",
			PremiumPlan: "+",
			TeamsPlan:   "+",
		},
		{
			ID:          "2223",
			Name:        "Feature2",
			Weight:      1000,
			IsHeader:    true,
			BasicPlan:   "",
			PremiumPlan: "",
			TeamsPlan:   "+",
		},
	}

	fakeApiClient.AddResponse(&featuresToSend, nil)

	features, err := mockMarketingStore.GetFeaturesList(context.TODO())
	assert.NoError(t, err)
	assert.EqualValues(t, featuresToSend, features)
	fakeApiClient.AssertRequest(t, 0, "GET", "HOST/api/features/", struct{}{})
	assert.Equal(t, fakeApiClient.Count(), 1)
}
