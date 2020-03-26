/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {combineReducers} from 'redux';
import auth from './auth/reducer';
import accounts from './accounts/reducer'
import bonds from './bonds/reducer';
import profile from './profile/reducer';
import features from './features/reducer';
import payments from './payments/reducer';
import companies from './companies/reducer';
import operations from './operations/reducer';


export default combineReducers({
  auth,
  accounts,
  bonds,
  profile,
  features,
  payments,
  companies,
  operations,
});


