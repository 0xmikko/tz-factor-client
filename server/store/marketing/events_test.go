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

func Test_store_SendEventGoal(t *testing.T) {

	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	dto := core.EventGoal{
		Goal:   "goal",
		UserID: "userID",
		URL:    "url",
	}

	fakeApiClient.AddResponse(&struct{}{}, nil)

	mockMarketingStore.SendEventGoal(context.TODO(), &dto)

	fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/goal/", &dto)
	assert.Equal(t, fakeApiClient.Count(), 1)

}

func Test_store_SendEventOpenPage(t *testing.T) {

	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	dto := core.EventOpenPage{
		URL:         "url",
		UserID:      "userID",
		UTMSource:   "source",
		UTMMedium:   "medium",
		UTMCampaign: "campaign",
	}

	fakeApiClient.AddResponse(struct{}{}, nil)

	mockMarketingStore.SendEventOpenPage(context.TODO(), &dto)

	fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/open/", &dto)
	assert.Equal(t, fakeApiClient.Count(), 1)

}
