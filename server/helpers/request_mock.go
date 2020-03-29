/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package helpers

import (
	"errors"
	"fmt"
	"github.com/stretchr/testify/assert"
	"net/http"
	"reflect"
	"testing"
)

type fakeApiClient struct {
	host      string
	key       string
	client    *http.Client
	pointer   int
	requests  []SavedRequest
	responses []FakeResponse
}

type SavedRequest struct {
	Method string
	URL    string
	Data   interface{}
}

type FakeResponse struct {
	Response  interface{}
	WantError error
}

type FakeApiClient interface {
	Request(method, url string, data interface{}, response interface{}) error
	AddResponse(response interface{}, wantError error)
	AssertRequest(t *testing.T, num int, method, url string, data interface{})
	Count() int
}

func NewFakeApiClient(host, key string) FakeApiClient {

	return &fakeApiClient{host: host, key: key}
}

func (s *fakeApiClient) Request(method, url string, data interface{}, response interface{}) error {

	if s.pointer >= len(s.responses) {
		return errors.New("Not enough resposnes")
	}

	s.requests = append(s.requests, SavedRequest{
		Method: method,
		URL:    s.host + url,
		Data:   data,
	})

	rv := reflect.ValueOf(response)
	if rv.Kind() != reflect.Ptr || rv.IsNil() {
		return errors.New("Can change not pointer values")
	}

	// We decode rv not rv.Elem because the Unmarshaler interface
	// test must be applied at the top level of the value.
	rv.Elem().Set(reflect.ValueOf(s.responses[s.pointer].Response).Elem())

	wantError := s.responses[s.pointer].WantError
	s.pointer++
	return wantError

}

func (s *fakeApiClient) AddResponse(response interface{}, wantError error) {
	s.responses = append(s.responses, FakeResponse{
		Response:  response,
		WantError: wantError,
	})
}

func (s *fakeApiClient) AssertRequest(t *testing.T, num int, method, url string, data interface{}) {
	//if num >= len(s.requests) {
	//	return errors.New("Not enough resposnes")
	//}

	assert.Less(t, num, len(s.requests))
	request := s.requests[num]

	assert.Equal(t, request.Method, method, fmt.Sprintf("Methods not equal. Want: %s, got %s", method, request.Method))
	assert.Equal(t, request.URL, url, fmt.Sprintf("Methods not equal. Want: %s, got %s", url, request.URL))

	//if request.URL != url {
	//	return errors.New(fmt.Sprintf("URLS not equat. Want: %s, got %s", url, request.URL))
	//}

	assert.EqualValues(t, data, request.Data)
	//if !reflect.DeepEqual(request.Data, data) {
	//	return errors.New(fmt.Sprintf("Values are not equal. Want: %v, got %v", data, request.Data))
	//}

}

func (s *fakeApiClient) Count() int {
	return len(s.responses)
}
