/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {APP_STATUS_ERROR, APP_STATUS_SPLASH, Profile} from '../../core/profile';
import {ProfileActions} from './';

export interface ProfileState extends Profile {}

const initialState: ProfileState = {
  status: APP_STATUS_SPLASH,
  email: '',
  name: '',
  job: '',
  industry: '',
};

export default function createReducer(
  state: ProfileState = initialState,
  action: ProfileActions,
): ProfileState {
  switch (action.type) {
    case 'PROFILE_REQUEST':
      return state;
    case 'PROFILE_SUCCESS':
      return action?.payload ? action.payload : state;
    case 'PROFILE_FAILURE':
      return {
        ...state,
        status: APP_STATUS_ERROR,
      };

    case 'PROFILE_UPDATE_STATUS':
      return {
        ...state,
        status: action.status,
      };
  }

  return state;
}
