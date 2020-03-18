/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {combineReducers} from 'redux';
import * as actionTypes from './index';
import {STATUS} from '../utils/status';
import {DataLoaderDetailsActions, DataLoaderListActions} from './types';

export type DataItem<T> = {
  data?: T;
  status: STATUS;
};

export type DataLoaderDetailsState<T> = {
  data: Record<string, DataItem<T>>;
  hashes: Record<string, DataItem<T>>;
};

export type DataLoaderListState<T> = {
  data: Array<T>;
  error?: boolean;
  status: STATUS;
};

export type DataObjectWithID = {
  id: string
}

export type DataloaderState<T extends DataObjectWithID> = {
  readonly List: DataLoaderListState<T>;
  readonly Details: DataLoaderDetailsState<T>;
};

export function createDataLoaderReducer<T extends DataObjectWithID>(prefix: string = '') {
  const initialState: DataloaderState<T> = {
    List: {
      data: [],
      error: undefined,
      status: STATUS.UPDATE_NEEDED,
    },
    Details: {
      data: {},
      hashes: {},
    },
  };

  const dataLoaderListReducer = function(
    state: DataLoaderListState<T> = initialState.List,
    action: DataLoaderListActions<T>,
  ): DataLoaderListState<T> {
    switch (action.type) {
      case prefix + actionTypes.LIST_REQUEST:
        return {...state, status: STATUS.LOADING};

      case prefix + actionTypes.LIST_SUCCESS:
        return {
          ...state,
          data: action.payload ? action.payload : [],
          status: STATUS.SUCCESS,
        };

      case prefix + actionTypes.LIST_FAILURE:
        return {
          ...state,
          data: [],
          status: STATUS.FAILURE,
          error: action?.error,
        };

      default:
        return state;
    }
  };

  const dataLoaderDetailsReducer = function(
    state: DataLoaderDetailsState<T> = initialState.Details,
    action: DataLoaderDetailsActions<T>,
  ): DataLoaderDetailsState<T> {

    const updateDetailState = (
      state: DataLoaderDetailsState<T>,
      id: string,
      hash: string,
      newData: DataItem<T>,
    ): DataLoaderDetailsState<T> => ({
      ...state,
      data: {
        ...state.data,
        [id]: newData,
      },
      hashes: {
        ...state.hashes,
        [hash]: newData,
      },
    });

    const id = action?.meta?.id || action?.payload?.id || '-';
    const hash = action?.meta?.hash;

    console.log(action.payload);

    switch (action.type) {
      case prefix + actionTypes.DETAIL_REQUEST:
        return updateDetailState(state, id, hash, {status: STATUS.LOADING});

      case prefix + actionTypes.UPLOAD_REQUEST:
        return updateDetailState(state, id, hash, {
          ...state.data[id],
          status: STATUS.UPDATING,
        });

      case prefix + actionTypes.DETAIL_SUCCESS:
      case prefix + actionTypes.UPLOAD_SUCCESS:
        return updateDetailState(state, id, hash, {
          data: action.payload,
          status: STATUS.SUCCESS,
        });

      case prefix + actionTypes.DETAIL_FAILURE:
      case prefix + actionTypes.UPLOAD_FAILURE:
        return updateDetailState(state, id, hash, {
          data: undefined,
          status: STATUS.FAILURE,
        });

      default:
        return state;
    }
  };

  return combineReducers({
    List: dataLoaderListReducer,
    Details: dataLoaderDetailsReducer,
  });
}
