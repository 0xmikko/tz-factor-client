/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RSAA, RSAAAction, RSAAResultAction,} from 'redux-api-middleware';
import {getFullAPIAddress} from '../utils/api';
import * as actionTypes from './';

import {RootState} from '../index';
import {AuthPayload} from './reducer';
import {getProfile, updateStatusInternally} from '../profile/actions';
import {APP_STATUS_AUTH_REQUIRED, Profile, ProfileStatus} from '../../core/profile';
import {SSO_ADDR} from "../../config";
import {LOGIN_SUCCESS} from "./";
import actions, {connectSocket} from "../actions";

export const login = (
  email: string,
  password: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const endpoint = '/auth/login/';
  const json = JSON.stringify({email, password});

  dispatch(authenticate(endpoint, json));
};

export const oauthAuthenticate = (
  provider: string,
  code: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const endpoint = '/auth/google/done/';
  const json = JSON.stringify({provider, code});

  dispatch(authenticate(endpoint, json));
};

export const confirmEmail = (
  email: string,
  code: string,
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const endpoint = '/auth/confirm/';
  const json = JSON.stringify({email, code, id});

  dispatch(authenticate(endpoint, json));
};

// Send request for refresh token

export const refreshAccessToken = (
  token: string,
): RSAAAction<any, AuthPayload, void> => ({
  [RSAA]: {
    endpoint: getFullAPIAddress('/auth/token/refresh/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({refresh: token}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    // @ts-ignore
    options: {timeout: 10000},
    types: [
      actionTypes.TOKEN_REQUEST,
      actionTypes.TOKEN_RECEIVED,
      actionTypes.TOKEN_FAILURE,
    ],
  },
});

export const signup = (
  email: string,
  password: string,
): RSAAAction<any, AuthPayload, void> => ({
  [RSAA]: {
    endpoint: getFullAPIAddress('/auth/signup/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'application/json'},
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
  },
});

/*
  Authenticate flow
  @param endpoint
  @param body
 */
export const authenticate = (
  endpoint: string,
  body: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const result = await dispatch<AuthPayload, void>({
    [RSAA]: {
      endpoint: getFullAPIAddress(endpoint, undefined, SSO_ADDR),
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'},
      types: [
        actionTypes.LOGIN_REQUEST,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE,
      ],
    },
  });

  if (
    !result.error &&
    result.payload.refresh &&
    result.type === actionTypes.LOGIN_SUCCESS
  ) {
    localStorage.setItem('token', result.payload.refresh.toString());
    await dispatch(getProfile());
  }

  console.log(result);
};

export const logout = () => {
  // Clear local storage at logout
  localStorage.clear();
  return {
    type: actionTypes.LOGOUT,
  };
};

export const getTokenAtStartup = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {

  const token = {
    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODU3NzY5NjAsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiIzNzU4NWYyMS03ZDljLTRlYTctOGQ1Yi1kYWQxYzZhMzZiYTYifQ.sHDAi0eZ19urUpvXVlRmcKtH1Yj44Y8SjCGkWOLhov0',
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODU3NzY5NjAsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiIzNzU4NWYyMS03ZDljLTRlYTctOGQ1Yi1kYWQxYzZhMzZiYTYifQ.sHDAi0eZ19urUpvXVlRmcKtH1Yj44Y8SjCGkWOLhov0',

  }
  await dispatch({
    type: LOGIN_SUCCESS,
    payload: token,
  })

  const profile : Profile = {
    id: '',
    name: "Mikhail Lazarev",
    email: "mikael.lazarev@gmail.com",
    status: 'READY',
    job: 'CEO',
    industry: 'Retail',
    role: 'ISSUER',

  }

  await dispatch({
    type: 'PROFILE_SUCCESS',
    payload: profile
  })

  await dispatch(connectSocket());
  //
  // const token = localStorage.getItem('token');
  // if (token) {
  //   const result = await dispatch(refreshAccessToken(token));
  //   if (
  //     !result.error &&
  //     result.payload.refresh &&
  //     result.type === actionTypes.TOKEN_RECEIVED
  //   ) {
  //     await dispatch(getProfile());
  //   } else {
  //     await dispatch(updateStatusInternally(APP_STATUS_AUTH_REQUIRED));
  //   }
  // } else {
  //   await dispatch(updateStatusInternally(APP_STATUS_AUTH_REQUIRED));
  // }
};

export const clearStatus = () => ({
  type: actionTypes.CLEAR_AUTH_DATA,
});

declare module 'redux-thunk' {
  /*
   * Overload to add api middleware support to Redux's dispatch() function.
   * Useful for react-redux or any other library which could use this type.
   */

  interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
    <Payload, Meta>(action: RSAAAction<any, Payload, Meta>): Promise<
      RSAAResultAction<Payload, Meta>
    >;
  }
}
