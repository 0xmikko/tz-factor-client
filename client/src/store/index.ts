/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import createApiMiddleware from './middleware';


let composeEnhancers : typeof compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = composeWithDevTools({});
} else {
  composeEnhancers = compose;
}

export type RootState = ReturnType<typeof reducer>;

export default function configureStore() {
  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(createApiMiddleware, thunk)),
  );
}
