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
import {
  LIST_SUCCESS,
  DETAIL_SUCCESS,
  LIST_FAILURE,
  DETAIL_FAILURE,
} from '../dataloader';
import {SocketEmitAction} from '../socketMiddleware';
import {namespace, PAYMENTS_PREFIX} from './';
import {TransferBondsDTO, TransferMoneyDTO} from '../../core/payments';
import {Tezos} from '@taquito/taquito';
import {contractAddress, tezosNode} from '../../config';
import {InMemorySigner} from '@taquito/signer';
import {updateStatus} from '../operations/actions';
import {STATUS} from '../utils/status';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'payments:updateList',
    typeOnSuccess: PAYMENTS_PREFIX + LIST_SUCCESS,
  });
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'payments:updateDetails',
    typeOnSuccess: PAYMENTS_PREFIX + DETAIL_SUCCESS,
  });
};

export const getDetails: (id: string) => SocketEmitAction = id => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'payments:retrieve',
  typeOnFailure: PAYMENTS_PREFIX + DETAIL_FAILURE,
  payload: {id},
});

export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'payments:list',
  typeOnFailure: PAYMENTS_PREFIX + LIST_FAILURE,
  payload: undefined,
});

export const transferMoney = (
  ophash: string,
  dto: TransferMoneyDTO,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {

  console.log('Transfer money', dto);

  if (!dto.from) return;
  try {
    Tezos.setProvider({
      rpc: tezosNode,
      signer: new InMemorySigner(dto.from.keystore.privateKey),
    });
    const contractInstance = await Tezos.contract.at(contractAddress);
    console.log('CI', contractInstance);

    const op = await contractInstance.methods
      .transferMoney(dto.to, dto.amount)
      .send();
    dispatch(updateStatus(ophash, STATUS.LOADING));
    console.log('DDD');
    await op.confirmation(1);
    dispatch(updateStatus(ophash, STATUS.SUCCESS));
  } catch (e) {
    console.log('OOOPS', e);
    dispatch(updateStatus(ophash, STATUS.FAILURE));
  }
};

export const transferBonds = (
  dto: TransferBondsDTO,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  console.log('Transfer bonds', dto);
};
