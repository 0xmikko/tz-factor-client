/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {RSAA} from 'redux-api-middleware';
import {getApiById} from '../utils/api';
import * as actionTypes from './index';
import {withAuth} from '../auth';

export const createDataLoaderListActions = (
  api: string,
  actionPrefix: string,
) => {
  return () => ({
    [RSAA]: {
      endpoint: getApiById(api, ''),
      method: 'GET',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        actionPrefix + actionTypes.LIST_REQUEST,
        actionPrefix + actionTypes.LIST_SUCCESS,
        actionPrefix + actionTypes.LIST_FAILURE,
      ],
    },
  });
};

export const createDataLoaderDetailActions = (
  api: string,
  actionPrefix: string,
) => {
  return (id: string, hash?: string) => ({
    [RSAA]: {
      endpoint: getApiById(api, id),
      method: 'GET',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        {
          type: actionPrefix + actionTypes.DETAIL_REQUEST,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.DETAIL_SUCCESS,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.DETAIL_FAILURE,
          meta: {id, hash},
        },
      ],
    },
  });
};

export const createDataLoaderCreateUpdateDataAction = <T>(
  apiCreate: string,
  apiUpdate: string,
  actionPrefix: string,
) => (id: string, data: T, hash: string = '0') => {
  console.log('[ACTIONS]: Update Data Loader Detail', id, data, hash);

  const api = id.startsWith('new')
    ? getApiById(apiCreate)
    : getApiById(apiUpdate, id);

  if (id === undefined) {
    throw new Error(
      'Error in updateDataLoaderDetail, wrong parameters!\napi:' +
        api +
        '\nid: ' +
        id,
    );
  }

  const method = id.startsWith('new') ? 'POST' : 'PUT';

  console.log('DATA SENT:', data);

  return {
    [RSAA]: {
      endpoint: api,
      method: method,
      headers: withAuth({'Content-Type': 'application/json'}),
      body: JSON.stringify(data),
      types: [
        {
          type: actionPrefix + actionTypes.UPLOAD_REQUEST,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.UPLOAD_SUCCESS,
          meta: {id, hash},
        },
        {
          type: actionPrefix + actionTypes.UPLOAD_FAILURE,
          meta: {id, hash},
        },
      ],
    },
  };
};
