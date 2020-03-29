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
import {namespace, OFFERS_PREFIX} from './';
import {OfferCreateDTO} from "../../core/offers";

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'offers:updateList',
    typeOnSuccess: OFFERS_PREFIX + LIST_SUCCESS,
  });
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'offers:updateDetails',
    typeOnSuccess: OFFERS_PREFIX + DETAIL_SUCCESS,
  });
};

export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'offers:list',
  typeOnFailure: OFFERS_PREFIX + LIST_FAILURE,
  payload: undefined,
});

export const createOffer: (
    dto: OfferCreateDTO,
    opHash: string,
) => SocketEmitAction = (dto, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'offers:create',
  typeOnFailure: OFFERS_PREFIX + DETAIL_FAILURE,
  payload: dto,
  opHash,
});
