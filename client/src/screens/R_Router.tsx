import React from 'react';
import {PrivateRoute} from '../components/PrivateRoute';
import {withTracker} from '../utils/ga';
import {BondsListScreen} from './Bonds/BondsListScreen';
import {Redirect, Route, Switch} from 'react-router';
import {SuppliersListScreen} from './R_Suppliers/SuppliersList';
import {R_PaymentsListScreen} from './Payments/PaymentsListScreen';
import AppBar from '../components/AppBar/AppBar';
import {PaymentsPayScreen} from './Payments/PaymentsPayScreen';
import {PaymentDetailsScreen} from './Payments/PaymentDetailsScreen';
import {CompaniesListScreen} from "./Companies/CompaniesListScreen";
import {CompanyDetailsScreen} from "./Companies/CompanyDetailsScreen";
import {BondDetailsScreen} from "./Bonds/BondDetailsScreen";
import {BondIssueScreen} from "./Bonds/BondIssueScreen";
import {NewMnemonicScreen} from "./Wallet/NewMnemonicScreen";

export const RetailerRouter: React.FC = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <PrivateRoute
            exact
            path="/wallet/accounts/new"
            component={withTracker(NewMnemonicScreen)}
        />
        <PrivateRoute
          exact
          path="/payments/new/edit"
          component={withTracker(PaymentsPayScreen)}
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
          component={withTracker(BondsListScreen)}
        />
        <PrivateRoute
            exact
            path="/bonds/new"
            component={withTracker(BondIssueScreen)}
        />
        <PrivateRoute
            exact
            path="/bonds/:id"
            component={withTracker(BondDetailsScreen)}
        />
        <PrivateRoute
          exact
          path="/companies"
          component={withTracker(CompaniesListScreen)}
        />
          <PrivateRoute
              exact
              path="/companies/:id"
              component={withTracker(CompanyDetailsScreen)}
          />
        <Route path={'*'}>
          <Redirect to={'/payments'} />
        </Route>
      </Switch>
    </>
  );
};
