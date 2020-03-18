/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store';

import ReactPixel from 'react-facebook-pixel';
import * as serviceWorker from './serviceWorker';
import ReactGA from "react-ga";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
// import 'bootstrap/dist/css/bootstrap.min.css';

library.add(fas);

const store = configureStore();

// Sentry
if (process.env.NODE_ENV === "production") {
    Sentry.init({dsn: "https://cd19416ad99349d0bc8df4b50b374d4e@sentry.io/3026714"});
}

// Google analytics
ReactGA.initialize('UA-159014001-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const options = {
    autoConfig: true, // set pixel's autoConfig
    debug: false, // enable logs
};
ReactPixel.init('yourPixelIdGoesHere');

ReactPixel.pageView(); // For tracking page view


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
