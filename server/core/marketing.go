/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/willie/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

package core

import (
	"context"
)

type (
	Landing struct {
		ID              string `json:"id"`
		OneLiner        string `json:"one_liner"`
		Title           string `json:"title"`
		MetaKeywords    string `json:"meta_keywords"`
		MetaDescription string `json:"meta_description"`
		Description     string `json:"description"`
		URL             string `gorm:"unique;not null" json:"url"`
	}

	Feature struct {
		ID          string `json:"id"`
		Name        string `json:"name" binding:"required"`
		Weight      int    `json:"weight" binding:"required"`
		IsHeader    bool   `json:"is_header"`
		BasicPlan   string `json:"basic_plan"`
		PremiumPlan string `json:"premium_plan"`
		TeamsPlan   string `json:"teams_plan"`
	}

	Lead struct {
		UserID    string `json:"user_id"`
		URL       string `json:"url"`
		UserAgent string `json:"user_agent"`
	}

	EventOpenPage struct {
		URL         string `json:"url"`
		UserID      string `json:"user_id"`
		UTMSource   string `json:"utm_source"`
		UTMMedium   string `json:"utm_medium"`
		UTMCampaign string `json:"utm_campaign"`
	}

	EventGoal struct {
		Goal   string `json:"goal"`
		UserID string `json:"user_id"`
		URL    string `json:"url"`
	}

	SignUpInfo struct {
		Email  string `json:"email"`
		UserID string `json:"user_id"`
		URL    string `json:"url"`
	}

	MarketingStoreI interface {

		// Gets landing data from CRM server
		GetLandingByURL(ctx context.Context, url string) (*Landing, error)

		// Sends data to CRM server to create a new landing page
		CreateLandingPage(ctx context.Context, landing *Landing) error

		// gets URL for /
		GetMainPageURL() string

		// Gets feature list from CRM server
		GetFeaturesList(ctx context.Context) ([]Feature, error)

		// Sends to CRM server request to crete a new lead identified by ID
		SendLead(ctx context.Context, lead *Lead) error

		// Sends to CRM server event that page was open
		SendEventOpenPage(ctx context.Context, eventOpenPage *EventOpenPage) error

		// Sends to CRM server event that user have chosen a specific goal
		SendEventGoal(ctx context.Context, eventGoal *EventGoal) error

		// Sends data to CRM server to start sign up flow
		SendSignupInfo(ctx context.Context, signUpInfo *SignUpInfo) error
	}

	MarketingServiceI interface {

		// Sends to CRM server request to craete a new lead identified by ID
		CreateLead(ctx context.Context, userID, url, userAgent string) error

		// Serve landing page from cache or template
		ServeLandingPage(ctx context.Context, url, cookie, userAgent, utmSource, utmMedium, utmCampaign string) ([]byte, error)

		// Sends to CRM server event that user have chosen a specific goal
		RegisterGoal(ctx context.Context, cookieID, url, goal string) error

		// Sends data to CRM server to start sign up flow
		SignUp(ctx context.Context, userID, email, url string) error

		// Reload cache for landing pages
		Reload(ctx context.Context) error
	}
)
