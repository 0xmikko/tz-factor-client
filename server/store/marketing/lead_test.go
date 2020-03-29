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

func Test_store_SendLead(t *testing.T) {
	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	dto := core.Lead{
		UserID:    "userID",
		URL:       "url",
		UserAgent: "userAgent",
	}

	fakeApiClient.AddResponse(&struct{}{}, nil)

	mockMarketingStore.SendLead(context.TODO(), &dto)

	fakeApiClient.AssertRequest(t, 0, "POST", "HOST/api/landings/lead/", &dto)
	assert.Equal(t, fakeApiClient.Count(), 1)

}
