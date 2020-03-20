/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import * as auth from './auth/actions';
import * as profile from './profile/actions';
import * as bonds from './bonds/actions';
import * as features from './features/actions';
import * as companies from './companies/actions';
import * as payments from './payments/actions';
import {Dispatch} from 'react';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './index';
import {Action} from 'redux';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  // Connect sockets to listen server events
  dispatch(bonds.connectSocket());
  dispatch(companies.connectSocket());
};

export default {
  auth,
  bonds,
  features,
  profile,
  companies,
  payments,
};
