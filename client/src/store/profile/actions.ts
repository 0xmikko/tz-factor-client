/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {RSAA, RSAAAction} from 'redux-api-middleware';
import {getFullAPIAddress} from '../utils/api';
import {withAuth} from '../auth';
import {AuthPayload} from '../auth/reducer';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {APP_STATUS_ERROR, Profile, ProfileStatus} from '../../core/profile';
import {SSO_ADDR} from "../../config";

// Get user profile from server
export const getProfile = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const endpoint = '/api/profile/';
  const result = await dispatch(profileAction('GET', endpoint));
  if (result.error || result.type === 'PROFILE_FAILURE') {
    dispatch(updateStatusInternally(APP_STATUS_ERROR))
  }

  if (!result.error && result.type === 'PROFILE_SUCCESS') {
    const id = result.payload.id;
    document.cookie = ""
  }

};

// Join update provider integrated flow
export const joinProfileRequest = (
  profile: Profile,
  password: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const result = await dispatch(updatePassword(password));
  if (!result.error && result.type === 'PROFILE_SUCCESS') {
    await dispatch(updateProfile(profile));
  }
};

export const updatePassword = (
  password: string,
): RSAAAction<any, Profile, void> => {
  const endpoint = '/api/profile/password/';
  const body = JSON.stringify({password});
  return profileAction('POST', endpoint, body);
};

export const updateProfile = (
  profile: Profile,
): RSAAAction<any, Profile, void> => {
  const endpoint = '/api/profile/';
  const body = JSON.stringify({...profile});
  return profileAction('POST', endpoint, body);
};

export const updateStatusInternally = (status: ProfileStatus) => {
  return {type: 'PROFILE_UPDATE_STATUS', status};
};

const profileAction = (
  method: 'GET' | 'POST',
  endpoint: string,
  body?: string,
): RSAAAction<any, Profile, void> => {
  return {
    [RSAA]: {
      endpoint: getFullAPIAddress(endpoint, undefined, SSO_ADDR),
      method: method,
      body: body,
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['PROFILE_REQUEST', 'PROFILE_SUCCESS', 'PROFILE_FAILURE'],
    },
  };
};
