import React from 'react';
import {PrivateRoute} from '../../components/PrivateRoute';
import {withTracker} from '../../utils/ga';
import {PaymentsListScreen} from './Payments/PaymentsListScreen';
import {Redirect, Route, Switch} from 'react-router';
import {SuppliersListScreen} from './Suppliers/SuppliersList';

export const RetailerRouter: React.FC = () => {
  return (
    <>
      <Switch>
        <PrivateRoute
          exact
          path="/payments"
          component={withTracker(PaymentsListScreen)}
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
