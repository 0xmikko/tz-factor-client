/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {LIST_SUCCESS, DETAIL_SUCCESS, LIST_FAILURE} from '../dataloader';
import {SocketEmitAction} from '../socketMiddleware';
import {namespace, COMPANIES_PREFIX} from './';
import {Company, UpsertCompanyProfileDTO} from '../../core/companies';
import {RSAA, RSAAAction} from "redux-api-middleware";
import {Profile} from "../../core/profile";
import {getFullAPIAddress} from "../utils/api";
import {BACKEND_ADDR, SSO_ADDR} from "../../config";
import {withAuth} from "../auth";




export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  console.log("QQ")
  const rersult = dispatch(updateAction());
  console.log(rersult)

  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'companies:updateList',
    typeOnSuccess: COMPANIES_PREFIX + LIST_SUCCESS,
  });
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'companies:updateDetails',
    typeOnSuccess: COMPANIES_PREFIX + DETAIL_SUCCESS,
  });


}

export const updateAction = (
): RSAAAction<any, Profile, void> => {
  return { [RSAA]: {
      endpoint: getFullAPIAddress('/company/', undefined, BACKEND_ADDR),
      method: 'POST',
      body: JSON.stringify({name: 'company name'}),
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['COMPANY_REQUEST', 'COMPANY_SUCCESS', 'COMPANY_FAILURE'],
    }}
}


export const getDetails: (id: string) => SocketEmitAction = id => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'companies:retrieve',
  typeOnFailure: COMPANIES_PREFIX + LIST_FAILURE,
  payload: {id},
});

export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'companies:list',
  typeOnFailure: COMPANIES_PREFIX + LIST_FAILURE,
  payload: undefined,
});

export const updateProfile: (
  profile: Company,
  opHash: string,
) => SocketEmitAction = (profile, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'companies:update',
  typeOnFailure: COMPANIES_PREFIX + LIST_FAILURE,
  payload: profile,
  opHash,
});
