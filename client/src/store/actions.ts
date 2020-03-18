/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import * as auth from './auth/actions';
import * as profile from './profile/actions';
import * as actions from './companies/actions';
import * as features from './features/actions'

export default {
  auth,
  actions,
  features,
  profile,

};
