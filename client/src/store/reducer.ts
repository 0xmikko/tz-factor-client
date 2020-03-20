/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {combineReducers} from 'redux';
import auth from './auth/reducer';
import bonds from './bonds/reducer';
import profile from './profile/reducer';
import features from './features/reducer';
import payments from './payments/reducer';
import companies from './companies/reducer';


export default combineReducers({
  auth,
  bonds,
  profile,
  features,
  payments,
  companies,
});


