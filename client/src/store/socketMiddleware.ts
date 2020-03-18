import io from 'socket.io-client';
import {RootState} from './index';
import {ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
import {Action, MiddlewareAPI, Dispatch} from 'redux';
import {BACKEND_ADDR} from '../config';
import {namespace} from './companies';

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

type resolver = (value?: SocketIOClient.Socket | undefined) => void;

export function createSocketMiddleware(): ThunkMiddleware<
  RootState,
  Action<string>,
  Action<string>
> {
  let socket = io(BACKEND_ADDR);
  let socketAuth: Record<string, SocketIOClient.Socket | undefined> = {};
  let isConnecting: Record<string, boolean | undefined> = {};
  let waitingPromises: Record<string, resolver[]> = {};

  /*
   * getNamespace returns promise for connected and authentificated namespace
   */
  const getNamespace: (
    namespace: string,
    jwtToken: string,
  ) => Promise<SocketIOClient.Socket> = (namespace, jwtToken) => {
    return new Promise<SocketIOClient.Socket>((resolve, reject) => {
      if (socketAuth && socketAuth[namespace]) {
        resolve(socketAuth[namespace]);
      }

      // If connection in progress we add resolver in queue
      if (isConnecting[namespace]) {
        waitingPromises[namespace].push(resolve)
        return
      } else {
        isConnecting[namespace] = true;
        waitingPromises[namespace] = [];
      }

      const nsp = io(BACKEND_ADDR + namespace);

      nsp
        .emit('authenticate', {token: jwtToken}) //send the jwt
        .on('authenticated', () => {
          socketAuth[namespace] = nsp;
          console.log('CONNECTED', socketAuth);
          resolve(nsp);


          for (const f of waitingPromises[namespace]) {
            f(nsp);
          }


        })
        .on('unauthorized', (msg: UnauthorizedError) => {
          console.log(`ERROR unauthorized: ${JSON.stringify(msg.data)}`);
          reject(msg.data.code);
          throw new Error(msg.data.type);
        })
        .on('disconnect', () => {
          if (socketAuth) socketAuth[namespace] = undefined;
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

    console.log('DISPATCH', action);
    switch (action.type) {
      case 'SOCKET_EMIT':

        if (jwt) {
          getNamespace(action.namespace, jwt).then(nsp => {
            nsp.emit(action.event, action.payload);
            console.log('EMIT', action.event, action.namespace);
          });

        } else {
          dispatch({type: action.typeOnFailure});
        }

        return;

      case 'SOCKET_ON':
        if (jwt) {
          getNamespace(action.namespace, jwt).then(nsp => {
            nsp.on(action.event, (payload: any) => {
              console.log("GET NEW INFO", payload)
              dispatch({
                type: action.typeOnSuccess,
                payload: payload,
              });
            });
            console.log("LISTENER ADDED", action.namespace, action.event);
          });
        } else {
          console.log('Cant connect');
        }
        return;

      default:
        next(action);
    }
  };
}

export default createSocketMiddleware();
