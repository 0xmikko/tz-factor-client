/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package helpers

import (
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func Test_Helpers_GetProjectRootDir(t *testing.T) {

	err := os.Setenv("ENV", "DEV")
	assert.NoError(t, err)

	got := GetProjectRootDir()
	assert.Equal(t, "/Users/mikhail/Coding/tz-factor-client/", got)

	err = os.Setenv("ENV", "PROD")
	assert.NoError(t, err)

	got = GetProjectRootDir()
	assert.Equal(t, "/app/", got)
}
