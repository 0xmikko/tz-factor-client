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
	"github.com/MikaelLazarev/willie/server/errors"
	response "github.com/MikaelLazarev/willie/server/handlers/responses"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"log"
	"net/http"
	"strings"
)

type GoalDTO struct {
	Goal string `form:"goal" binding:"required"`
	URL  string `form:"url" binding:"required"`
}

func GoalHandler(c *gin.Context) {

	var dto GoalDTO

	err := c.ShouldBindWith(&dto, binding.FormPost)
	if err != nil {
		errors.LogError(&errors.ApiError{
			Module:  "handlers/landings/goal.go",
			Problem: "Cant bind to Goal DTO",
			Code:    0,
			Err:     err,
		})
		c.AbortWithStatusJSON(http.StatusBadRequest, response.Http400WrongRequest)
		return
	}

	userID := c.GetString("userId")
	if userID == "" {
		log.Println("Request without userID in context")
		c.AbortWithStatusJSON(http.StatusBadRequest, response.Http400WrongRequest)
		return
	}

	dto.URL = strings.TrimPrefix(dto.URL, "/")
	dto.URL = strings.TrimPrefix(dto.URL, "pr/")

	if err := marketingService.RegisterGoal(context.TODO(), userID, dto.URL, dto.Goal); err != nil {
		errors.LogError(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, response.Http200OK)

}
