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
import {ACCOUNTS_PREFIX, namespace, PAYMENTS_PREFIX} from './';
import {PaymentCreateDTO} from "../../core/payments";

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
    dispatch({
        type: 'SOCKET_ON',
        namespace,
        event: 'payments:updateAccountsList',
        typeOnSuccess: ACCOUNTS_PREFIX + LIST_SUCCESS,
    });
};

export const getDetails: (id: string) => SocketEmitAction = id => ({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'payments:retrieve',
    typeOnFailure: PAYMENTS_PREFIX + LIST_FAILURE,
    payload: {id},
});

export const pay: (dto: PaymentCreateDTO) => SocketEmitAction = (dto) => ({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'payments:pay',
    typeOnFailure: PAYMENTS_PREFIX + DETAIL_FAILURE,
    payload: dto,
});


export const getList: () => SocketEmitAction = () => ({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'payments:list',
    typeOnFailure: PAYMENTS_PREFIX + LIST_FAILURE,
    payload: undefined,
});

export const getAccountsList: () => SocketEmitAction = () => ({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'payments:contractorAccounts',
    typeOnFailure: ACCOUNTS_PREFIX + LIST_FAILURE,
    payload: undefined,
});
