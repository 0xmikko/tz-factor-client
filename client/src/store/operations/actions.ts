import {Action} from 'redux';
import {namespace, OPERATION_PREFIX} from "./index";
import {DETAIL_SUCCESS, LIST_SUCCESS} from "../dataloader";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

export const updateStatus = (opHash: string, status: string, error?: string) => ({
  type: OPERATION_PREFIX + DETAIL_SUCCESS,
  payload: {
    id: opHash,
    status,
    error,
  },
});

export const connectSocket = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
    > => async dispatch => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'operations:update',
    typeOnSuccess: OPERATION_PREFIX + DETAIL_SUCCESS,
  });
};
