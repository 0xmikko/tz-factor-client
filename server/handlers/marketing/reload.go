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
	. "github.com/MikaelLazarev/willie/server/errors/sentry"
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ReloadHandler(c *gin.Context) {

	err := marketingService.Reload(context.TODO())
	if err != nil {
		ReportError(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, response.Http500InternalError)
		return
	}

	c.JSON(http.StatusOK, response.Http200OK)
}
