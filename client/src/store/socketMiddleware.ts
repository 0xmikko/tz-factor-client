import io from 'socket.io-client';
import {RootState} from './index';
import {ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
import {Action, MiddlewareAPI, Dispatch} from 'redux';
import {BACKEND_ADDR} from '../config';

// interface ThunkMiddleware {
//   dispatch: ThunkDispatch<RootState, unknown, Action<string>>;
//   getState: () => RootState;
// }

export interface JwtData {
  message: string;
  code: string;
  type: string;
}

export interface SocketEmitAction {
  type: 'SOCKET_EMIT';
  namespace: string;
  event: string;
  payload: unknown;
  typeOnFailure: string;
}

export interface SocketOnAction {
  type: 'SOCKET_ON';
  namespace: string;
  event: string;
  typeOnSuccess: string;
}

/**
 * An Error Object used by the package.
 */
interface UnauthorizedError {
  message: string;
  inner: Error;
  data: JwtData;
}

export function createSocketMiddleware(): ThunkMiddleware<
  RootState,
  Action<string>,
  Action<string>
> {
  let socket = io(BACKEND_ADDR);
  let socketAuth: Record<string, SocketIOClient.Socket | undefined>;

  /*
   * getNamespace returns promise for connected and authentificated namespace
   */
  const getNamespace: (
    namespace: string,
    jwtToken: string,
  ) => Promise<SocketIOClient.Socket> = (namespace, jwtToken) => {
    return new Promise<SocketIOClient.Socket>((resolve, reject) => {
      if (socketAuth[namespace]) {
        resolve(socketAuth[namespace]);
      }
      const nsp = io(BACKEND_ADDR + namespace);

      socket
        .emit('authenticate', {token: jwtToken}) //send the jwt
        .on('authenticated', () => {
          socketAuth[namespace] = socket;
          resolve(socket);
        })
        .on('unauthorized', (msg: UnauthorizedError) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
          reject(msg.data.code);
          throw new Error(msg.data.type);
        })
        .on('disconnect', () => {
          socketAuth[namespace] = undefined;
        });
    });
  };

  /*
   ** Middleware gets connection and emits new request or start to listen on
   */

  return ({dispatch, getState}) => (next: Dispatch) => (
    action: SocketEmitAction | SocketOnAction,
  ) => {
    const jwt = getState().auth.access?.token;

    switch (action.type) {
      case 'SOCKET_EMIT':
        if (jwt) {
          getNamespace(action.namespace, jwt).then(nsp => {
            nsp.emit(action.event, action.payload);
          });
        } else {
            dispatch({type: action.typeOnFailure})
        }

        return;

      case 'SOCKET_ON':
        socket.on(action.event, (payload: any) =>
          dispatch({
            type: action.typeOnSuccess,
            payload: payload,
          }),
        );
        return;

      default:
        next(action);
    }
  };
}

export default createSocketMiddleware();
