/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {ACCOUNTS_KEY_PREFIX, ACCOUNTS_PREFIX} from './';
import {combineReducers} from 'redux';
import {createDataLoaderListReducer} from '../dataloader/list';
import {Account, AccountKey} from '../../core/accounts';

export default combineReducers({
  List: createDataLoaderListReducer<Account>(ACCOUNTS_PREFIX),
  LocalList: createDataLoaderListReducer<AccountKey>(ACCOUNTS_KEY_PREFIX),
});
