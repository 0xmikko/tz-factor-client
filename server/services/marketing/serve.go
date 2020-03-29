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
	"github.com/MikaelLazarev/willie/server/errors/sentry"
)

func (s *service) ServeLandingPage(ctx context.Context, url, userID, userAgent, utmSource, utmMedium, utmCampaign string) ([]byte, error) {

	if url == "" {
		url = s.store.GetMainPageURL()
	}

	go func() {

		s.sendEventOpenPage(ctx, url, userID, utmSource, utmMedium, utmCampaign)

	}()

	content, err := s.getPageContent(url)
	if err != nil {
		content, err = s.getPageContent("404")
		if err != nil {
			sentry.ReportError(err)
			return nil, errors.ErrorPageNotFound
		}
		return content, nil
	}

	return s.getPageContent(url)
}

func (s *service) getPageContent(url string) ([]byte, error) {

	if s.isCached {
		content, ok := s.cache[url]
		if ok {
			return content, nil
		}
	}

	return s.getTemplate(url)
}
