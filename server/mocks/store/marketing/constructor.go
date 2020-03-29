/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package mockmarketingstore

import (
	"context"
	"github.com/MikaelLazarev/willie/server/core"
	"github.com/MikaelLazarev/willie/server/errors"
)

type store struct {
	Landings      map[string]core.Landing
	Leads         []core.Lead
	EventGoals    []core.EventGoal
	EventOpenPage []core.EventOpenPage
	SignUpInfo    []core.SignUpInfo
	Features      []core.Feature
	Test          string
}

func NewMarketingStore() *store {

	cs := &store{
		Landings:      make(map[string]core.Landing),
		Leads:         make([]core.Lead, 0),
		EventGoals:    make([]core.EventGoal, 0),
		EventOpenPage: make([]core.EventOpenPage, 0),
		SignUpInfo:    make([]core.SignUpInfo, 0),
	}
	return cs
}

func (s *store) GetLandingByURL(ctx context.Context, url string) (*core.Landing, error) {
	landing, ok := s.Landings[url]
	if !ok {
		return nil, errors.ErrorRecordNotFound
	}
	return &landing, nil
}

func (s *store) CreateLandingPage(ctx context.Context, landing *core.Landing) error {
	s.Landings[landing.URL] = *landing
	return nil
}

func (s *store) GetMainPageURL() string {
	return ""
}

func (s *store) GetFeaturesList(ctx context.Context) ([]core.Feature, error) {
	return s.Features, nil
}

func (s *store) SendLead(ctx context.Context, lead *core.Lead) error {
	s.Leads = append(s.Leads, *lead)
	return nil
}

func (s *store) SendEventOpenPage(ctx context.Context, eventOpenPage *core.EventOpenPage) error {
	s.EventOpenPage = append(s.EventOpenPage, *eventOpenPage)
	return nil
}

func (s *store) SendEventGoal(ctx context.Context, eventGoal *core.EventGoal) error {
	s.EventGoals = append(s.EventGoals, *eventGoal)
	s.Test = "HERR"
	return nil
}

func (s *store) SendSignupInfo(ctx context.Context, signUpInfo *core.SignUpInfo) error {
	s.SignUpInfo = append(s.SignUpInfo, *signUpInfo)
	return nil
}
