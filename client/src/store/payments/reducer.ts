/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {ACCOUNTS_PREFIX, PAYMENTS_PREFIX} from './';
import {Account} from "../../core/companies";
import {Payment} from '../../core/payments';
import {PaymentListItem} from '../../core/payments';
import {combineReducers} from 'redux';
import {createDataLoaderListReducer} from '../dataloader/list';
import {createDataLoaderDetailsReducer} from '../dataloader/details';

export default combineReducers({
  Details: createDataLoaderDetailsReducer<Payment>(PAYMENTS_PREFIX),
  List: createDataLoaderListReducer<PaymentListItem>(PAYMENTS_PREFIX),
  AccountsList: createDataLoaderListReducer<Account>(ACCOUNTS_PREFIX),
});
