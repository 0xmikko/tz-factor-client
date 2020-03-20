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
import {LIST_SUCCESS, DETAIL_SUCCESS, LIST_FAILURE, DETAIL_FAILURE} from '../dataloader';
import {SocketEmitAction} from '../socketMiddleware';
import {namespace, BONDS_PREFIX} from './';
import {BondCreateDTO} from "../../core/bonds";

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'bonds:updateList',
    typeOnSuccess: BONDS_PREFIX + LIST_SUCCESS,
  });
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'bonds:updateDetails',
    typeOnSuccess: BONDS_PREFIX + DETAIL_SUCCESS,
  });
};

export const getDetails: (id: string) => SocketEmitAction = id => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'bonds:retrieve',
  typeOnFailure: BONDS_PREFIX + LIST_FAILURE,
  payload: {id},
});

export const create: (dto: BondCreateDTO) => SocketEmitAction = (dto) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'bonds:create',
  typeOnFailure: BONDS_PREFIX + DETAIL_FAILURE,
  payload: dto,
});


export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'bonds:list',
  typeOnFailure: BONDS_PREFIX + LIST_FAILURE,
  payload: undefined,
});
