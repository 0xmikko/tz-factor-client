/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package marketing

import (
	"bytes"
	"context"
	"github.com/MikaelLazarev/willie/server/errors"
	"github.com/MikaelLazarev/willie/server/errors/sentry"
	"github.com/MikaelLazarev/willie/server/helpers"
	"log"
	"text/template"
)

type LandingTemplate struct {
	BlockHeader string
	BlockFooter string
	URL         string

	MetaKeywords    string
	MetaDescription string
	Title           string
	OneLiner        string
	Description     string
}

func (s *service) getTemplate(url string) (content []byte, err error) {

	var lt LandingTemplate

	landing, err := s.store.GetLandingByURL(context.TODO(), url)

	lt.URL = landing.URL
	lt.OneLiner = landing.OneLiner
	lt.MetaDescription = landing.MetaDescription
	lt.MetaKeywords = landing.MetaKeywords
	lt.Title = landing.Title
	lt.Description = landing.Description

	lt.BlockHeader, err = getTemplate("l_templates/header.html", &lt)
	if err != nil {
		return
	}

	lt.BlockFooter, err = getTemplate("l_templates/footer.html", &lt)
	if err != nil {
		return
	}

	contentStr, err := getTemplate("landing/"+url+"/index.html", &lt)
	if err != nil {
		return
	}

	log.Printf("Page for %s was succesfully generated", url)

	return []byte(contentStr), nil

}

func getTemplate(name string, t *LandingTemplate) (string, error) {

	lpTemplate, err := template.ParseFiles(helpers.GetProjectRootDir() + name)
	if err != nil {

		sentry.ReportError(errors.ApiError{
			Module:  "services/landings/template.go",
			Problem: "Cant load template " + name,
			Code:    0,
			Err:     err,
		})
		return "", err
	}

	buffer := new(bytes.Buffer)

	lpTemplate.Execute(buffer, t)

	return buffer.String(), nil
}
