/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {combineReducers} from 'redux';
import {STATUS} from '../utils/status';
import {createDataLoaderListReducer} from './list';
import {createDataLoaderDetailsReducer} from './details';

export type DataItem<T> = {
  data?: T;
  status: STATUS;
};

export type DataObjectWithID = {
  id: string;
};

export function createDataLoaderReducer<T extends DataObjectWithID>(
  prefix: string = '',
) {
  return combineReducers({
    List: createDataLoaderListReducer<T>(prefix),
    Details: createDataLoaderDetailsReducer<T>(prefix),
  });
}
