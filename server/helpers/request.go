/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package helpers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	errors2 "github.com/MikaelLazarev/willie/server/errors"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"time"
)

type apiClient struct {
	host   string
	key    string
	client *http.Client
}

type ApiClient interface {
	Request(method, url string, data interface{}, response interface{}) error
}

func NewApiCall(host, key string) ApiClient {
	timeout := 10 * time.Second
	transport := &http.Transport{
		DialContext: (&net.Dialer{
			Timeout: timeout,
		}).DialContext,
	}

	return &apiClient{host: host, key: key, client: &http.Client{
		Timeout:   timeout,
		Transport: transport,
	}}
}

func (s *apiClient) Request(method, url string, data interface{}, response interface{}) error {

	dataJson, err := json.Marshal(data)
	if err != nil {
		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: "Cant marshal data",
			Code:    500,
			Err:     err,
		}
	}

	req, err := http.NewRequest(method, s.host+url, bytes.NewBuffer(dataJson))
	if err != nil {
		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: "Cant make request",
			Code:    500,
			Err:     err,
		}
	}

	// Setting content-type
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.key)

	// Making request
	res, err := s.client.Do(req)
	if err != nil {
		log.Println(err)
		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: "Network failure",
			Code:    500,
			Err:     err,
		}
	}

	log.Printf("%v", res)

	if res.StatusCode < http.StatusOK || res.StatusCode > 299 {

		var problem string

		switch res.StatusCode {
		case http.StatusNotFound:
			problem = errors2.ErrorRecordNotFound.Error()

		case http.StatusForbidden:
			problem = "Forbidden"

		default:
			problem = "Network error"
		}

		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: problem,
			Code:    res.StatusCode,
			Err:     errors.New(fmt.Sprintf("Network failure with %d code", res.StatusCode)),
		}
	}

	responseBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: "Cant get body",
			Code:    500,
			Err:     err,
		}
	}

	err = json.Unmarshal(responseBody, &response)
	if err != nil {
		return &errors2.ApiError{
			Module:  "helpers/request.go",
			Problem: "Cant unmarshal data",
			Code:    500,
			Err:     err,
		}
	}

	return nil

}
