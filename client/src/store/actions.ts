/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import * as auth from './auth/actions';
import * as accounts from './accounts/actions';
import * as profile from './profile/actions';
import * as bonds from './bonds/actions';
import * as features from './features/actions';
import * as companies from './companies/actions';
import * as payments from './payments/actions';
import * as operations from './operations/actions';
import * as offers from './offers/actions';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './index';
import {Action} from 'redux';

// Connect socket connects redux with socket server interface
export const actionsAfterAuth = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  // Connect sockets to listen server events
  dispatch(accounts.getLocalAccountsList());
  dispatch(accounts.connectSocket());
  dispatch(bonds.connectSocket());
  dispatch(companies.connectSocket());
  dispatch(payments.connectSocket());
  dispatch(operations.connectSocket());
  dispatch(offers.connectSocket());
};

export default {
  auth,
  accounts,
  bonds,
  features,
  profile,
  companies,
  payments,
  offers,
};
