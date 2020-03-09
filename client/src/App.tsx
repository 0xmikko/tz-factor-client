/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';

import {LoginScreen} from './screens/Auth/LoginScreen/LoginScreen';
import {GoogleAuthDoneScreen} from './screens/Auth/GoogleDoneScreen';
import {SplashScreen} from './screens/SplashScreen';
import {PrivateRoute} from './components/PrivateRoute';
import {ThankYouScreen} from './screens/ThankYouScreen/ThankYouScreen';
import {EmailConfirmScreen} from './screens/Auth/EmailConfirmScreen';
import {ResendScreen} from './screens/Auth/ResendScreen/ResendScreen';

import actions from './store/actions';
import {RootState} from './store';
import {withTracker} from './utils/ga';

import {
    APP_STATUS_AUTH_REQUIRED,
    APP_STATUS_CHOOSING_PLAN,
    APP_STATUS_ERROR,
    APP_STATUS_FILLING_PROFILE,
    APP_STATUS_READY,
} from './core/profile';

import './App.css';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.auth.getTokenAtStartup());
  }, [dispatch]);

  const appStatus = useSelector((state: RootState) => state.profile.status);
  const role = useSelector((state: RootState) => state.auth.access?.role)

  switch (appStatus) {
    case APP_STATUS_AUTH_REQUIRED:
      return (
        <Switch>
          <Route
            path="/login/"
            exact={true}
            component={withTracker(LoginScreen)}
          />
          <Route
            path="/resend/"
            exact={true}
            component={withTracker(ResendScreen)}
          />
          <Route
            path="/login/google/done/"
            exact={true}
            render={() => <GoogleAuthDoneScreen method={'login'} />}
          />
          <Route
            path="/signup/confirm/"
            exact={true}
            render={() => <EmailConfirmScreen />}
          />
          <Redirect to={'/login/'} />
        </Switch>
      );

    case APP_STATUS_FILLING_PROFILE:
    case APP_STATUS_READY:
      switch(role) {
        case 'ISSUER':
          return (
            <PrivateRoute path="/" component={withTracker()} />
          )
      }
      return (
        <Switch>
          {' '}
          <PrivateRoute path="*" component={withTracker(ThankYouScreen)} />
        </Switch>
      );

    case APP_STATUS_ERROR:
      return <>'Internal error. Please, reload to continue'</>;
  }

  return <SplashScreen />;
};

export default App;
