package marketing

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/helpers"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_store_GetByURL(t *testing.T) {
	fakeApiClient := helpers.NewFakeApiClient("HOST", "SECRET_KEY")
	mockMarketingStore := NewFromClient(fakeApiClient)

	newLanding := &core.Landing{
		ID: "TEST_ID",
	}

	fakeApiClient.AddResponse(newLanding, nil)

	landing, err := mockMarketingStore.GetLandingByURL(context.TODO(), "test-project-001")
	assert.NoError(t, err)
	assert.EqualValues(t, newLanding, landing)

	fakeApiClient.AssertRequest(t, 0, "GET", "HOST/api/landings/u/test-project-001/", struct{}{})
	assert.Equal(t, fakeApiClient.Count(), 1)

}
