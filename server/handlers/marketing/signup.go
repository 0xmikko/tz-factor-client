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
	"errors"
	"github.com/MikaelLazarev/willie/server/errors/sentry"
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"log"
	"net/http"
	"strings"
)

type SignUpSendLetterDTO struct {
	Email string `form:"email" binding:"required,email"`
	URL   string `form:"url" binding:"required"`
}

func Signup(c *gin.Context) {

	var dto SignUpSendLetterDTO

	// Bind parameters
	if err := c.ShouldBindWith(&dto, binding.FormPost); err != nil {
		log.Println("Cant bind signup interface")
		c.AbortWithStatusJSON(http.StatusBadRequest, response.Http400WrongRequest)
		return
	}

	userID := c.GetString("userId")
	if userID == "" {
		sentry.ReportError(errors.New("Cant get user id in cookie"))
	}

	dto.URL = strings.TrimPrefix(dto.URL, "/")
	dto.URL = strings.TrimPrefix(dto.URL, "pr/")

	// Get profile for specified user
	err := marketingService.SignUp(context.TODO(), userID, dto.Email, dto.URL)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, response.Http404UserNotFound)
		return
	}

	c.JSON(http.StatusOK, response.Http200OK)

}
