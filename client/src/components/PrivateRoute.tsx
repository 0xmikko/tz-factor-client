/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Route, RouteProps} from 'react-router';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {isAuthenticated} from '../store/auth';
import {LoginScreen} from "../screens/Auth/LoginScreen/LoginScreen";

export function PrivateRoute({...props}: RouteProps) {
  const isSignIn = useSelector((state: RootState) => isAuthenticated(state));

  if (isSignIn) {
    return <Route {...props} />;
  }

  delete props.component;
  delete props.render;
  return (
    <Route
      {...props}
      render={({location}) => (
        <LoginScreen />
      )}
    />
  );
}
