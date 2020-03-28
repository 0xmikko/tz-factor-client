/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {PAYMENTS_PREFIX} from './';
import {Payment} from '../../core/payments';
import {combineReducers} from 'redux';
import {createDataLoaderListReducer} from '../dataloader/list';

export default combineReducers({
  List: createDataLoaderListReducer<Payment>(PAYMENTS_PREFIX),
});
