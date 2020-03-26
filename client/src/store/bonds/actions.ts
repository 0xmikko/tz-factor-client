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
import {namespace, BONDS_PREFIX} from './';
import {BondCreateDTO} from '../../core/bonds';
import {Tezos} from '@taquito/taquito';
import {InMemorySigner} from '@taquito/signer';
import {contractAddress, tezosNode} from '../../config';
import {updateStatus} from "../operations/actions";
import {STATUS} from "../utils/status";

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

export const getList: () => SocketEmitAction = () => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'bonds:list',
  typeOnFailure: BONDS_PREFIX + LIST_FAILURE,
  payload: undefined,
});

export const create = (
  dto: BondCreateDTO,
  opHash: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  console.log("Start delivering Bond", dto)
  dispatch(updateStatus(opHash, STATUS.LOADING));
  try {
    Tezos.setProvider({
      rpc: tezosNode,
      signer: new InMemorySigner(dto.account.keystore.privateKey),
    });
    const contractInstance = await Tezos.contract.at(contractAddress);
    console.log("CI", contractInstance)
    console.log("CI", new Date(dto.matureDate).toISOString())


    const op = await contractInstance.methods
        .issueBond(new Date(dto.matureDate).toISOString(), dto.amount)
        .send();
    console.log("DDD")
    await op.confirmation(1);
    dispatch(updateStatus(opHash, STATUS.SUCCESS));
  }catch (e) {
    console.log("OOOPS", e)
    dispatch(updateStatus(opHash, STATUS.FAILURE));
  }
};
