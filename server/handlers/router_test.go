/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package handlers

import (
	"testing"
)

// Integration test
func Test_Handlers_RegisterRouter(t *testing.T) {

	//mock := mocks.New()
	//router := registerRouter(mock.GetServices())
	//
	//t.Run("/api/landings not accessible without token", func(t *testing.T) {
	//	w := httptest.NewRecorder()
	//	req, _ := http.NewRequest("GET", "/api/landings/", nil)
	//	router.ServeHTTP(w, req)
	//
	//	assert.Equal(t, http.StatusForbidden, w.Code)
	//	assert.Equal(t, "{\"message\":\"Your request is not authorized\"}\n", w.Body.String())
	//})
	//
	//t.Run("/api/hypotheses not accessible without incorrect token", func(t *testing.T) {
	//	w := httptest.NewRecorder()
	//	req, _ := http.NewRequest("GET", "/api/landings/", nil)
	//	req.Header.Set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODIxNjcxMjUsInVzZXJfaWQiOiIzMjE4NmUyYi1hZWY2LTQ0MjMtYmVlNi02NjdlZWUyYTAxZTEifQ.CPPpSlr65Qwb8L-UrQRYqC6RF5B9TS6jRLxfQLbCOvQ")
	//	router.ServeHTTP(w, req)
	//
	//	assert.Equal(t, http.StatusForbidden, w.Code)
	//	assert.Equal(t, "{\"message\":\"Invalid authorization token\"}\n", w.Body.String())
	//})

}
