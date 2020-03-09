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
import {getFullAPIAddress} from '../utils/api';

export interface JwtData {
  message: string;
  code: string;
  type: string;
}

/**
 * An Error Object used by the package.
 */
interface UnauthorizedError {
  message: string;
  inner: Error;
  data: JwtData;
}

// Sends pressed event
export const sendEvent = (
  socket: SocketIOClient.Socket,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState,
) => {
  const jwt = getState().auth.access?.token;
  console.log(jwt);

  socket
    .emit('authenticate', {token: jwt}) //send the jwt
    .on('authenticated', () => {
      console.log('Auth');
      socket.emit('list')
      socket.on('list', (data: string) => {
        console.log(data)
      })
    })
    .on('unauthorized', (msg: UnauthorizedError) => {
      console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      throw new Error(msg.data.type);
    });
};
