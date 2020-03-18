import React from 'react';
import {PrivateRoute} from '../components/PrivateRoute';
import {withTracker} from '../utils/ga';
import {R_ObligationsListScreen} from './Bonds/R_ObligationsListScreen';
import {Redirect, Route, Switch} from 'react-router';
import {SuppliersListScreen} from './R_Suppliers/SuppliersList';
import {R_PaymentsListScreen} from './Payments/PaymentsListScreen';
import AppBar from '../components/AppBar/AppBar';
import {PaymentsEditScreen} from "./Payments/PaymentsEditScreen";
import {PaymentDetailsScreen} from "./Payments/PaymentDetailsScreen";

export const RetailerRouter: React.FC = () => {
  return (
    <>
      <AppBar />
      <Switch>
          <PrivateRoute
              exact
              path="/payments/new/edit"
              component={withTracker(PaymentsEditScreen)}
          />
          <PrivateRoute
              exact
              path="/payments/:id"
              component={withTracker(PaymentDetailsScreen)}
          />
        <PrivateRoute
          exact
          path="/payments"
          component={withTracker(R_PaymentsListScreen)}
        />
        <PrivateRoute
          exact
          path="/bonds"
          component={withTracker(R_ObligationsListScreen)}
        />
        <PrivateRoute
          exact
          path="/suppliers"
          component={withTracker(SuppliersListScreen)}
        />
        <Route path={'*'}>
          <Redirect to={'/payments'} />
        </Route>
      </Switch>
    </>
  );
};
