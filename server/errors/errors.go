/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package errors

import (
	"errors"
	"log"
)

type ApiError struct {
	Module  string
	Problem string
	Code    int
	Err     error
}

func (ae ApiError) Error() string {
	if ae.Err != nil {
		return ae.Err.Error()
	}
	return "Empty error provided"
}

func LogError(e error) {
	ae, ok := e.(ApiError)
	if ok {
		log.Printf("[%s]: %s\nError: %s\n", ae.Module, ae.Problem, ae.Error())
		return
	}
	log.Println(ae)
}

var (
	// Database errors
	ErrorCantFulFill    = errors.New("you can fulfill your address only once per 24h")
	ErrorDBError        = errors.New("database error")
	ErrorHaveNoRights   = errors.New("you have no rights for this operation")
	ErrorRecordNotFound = errors.New("record not found")

	// Service errors
	ErrorUserAlreadyExists = errors.New("user already exists")
	ErrorUserNotFound      = errors.New("user not found")
	ErrorPageNotFound      = errors.New("Page not found")
	ErrorUnknown           = errors.New("unknown error")
)
