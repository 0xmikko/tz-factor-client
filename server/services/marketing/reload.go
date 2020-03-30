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
	"github.com/MikaelLazarev/willie/server/config"
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/errors"
	"github.com/MikaelLazarev/willie/server/errors/sentry"
	"github.com/MikaelLazarev/willie/server/helpers"
	"io/ioutil"
	"log"
)

func (s *service) Reload(ctx context.Context) error {
	landingDir := helpers.GetProjectRootDir() + "landing/"

	// Use cache for PROD only
	s.isCached = config.GetConfigType() == config.PROD
	//s.isCached = true

	s.cache = make(map[string][]byte)

	dirContent, err := ioutil.ReadDir(landingDir)
	if err != nil {
		log.Fatalln("Cant get content of directory", landingDir)
	}

	for _, fileInfo := range dirContent {
		url := fileInfo.Name()
		if fileInfo.IsDir() && url != "assets" {

			// Check that landing indexed in database
			_, err := s.store.GetLandingByURL(context.TODO(), url)

			//log.Println(err)
			//// If unexpected error was happened
			//if err != nil && err.Error() != errors.ErrorRecordNotFound.Error() {
			//	sentry.ReportError(err)
			//	continue
			//}

			// if we do not find a landing page
			if err != nil {

				err := s.CreateLandingPage(context.TODO(), &core.Landing{
					OneLiner: url,
					URL:      url,
				})

				if err != nil {
					errors.LogError(err)
					sentry.ReportError(err)
				}

			}
			// Caching pages
			if s.isCached {
				content, err := s.getTemplate(url)
				if err == nil {
					s.cache[url] = content
				}
			}

		}
	}

	log.Printf("%d pages were cached", len(s.cache))
	return nil
}
