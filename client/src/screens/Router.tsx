import React from 'react';
import {PrivateRoute} from '../components/PrivateRoute';
import {withTracker} from '../utils/ga';
import {BondsListScreen} from './Bonds/BondsListScreen';
import {Redirect, Route, Switch} from 'react-router';
import {PaymentsListScreen} from './Payments/PaymentsListScreen';
import AppBar from '../components/AppBar/AppBar';
import {TransferMoneyScreen} from './Payments/TransferMoneyScreen';
import {CompaniesListScreen} from "./Companies/CompaniesListScreen";
import {CompanyDetailsScreen} from "./Companies/CompanyDetailsScreen";
import {BondDetailsScreen} from "./Bonds/BondDetailsScreen";
import {BondIssueScreen} from "./Bonds/BondIssueScreen";
import {NewAccountScreen} from "./Wallet/NewAccountScreen";
import {TransferBondsScreen} from "./Payments/TransferBondsScreen";
import {WalletScreen} from "./Wallet/WalletScreen";

export const Router: React.FC = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <PrivateRoute
            exact
            path="/wallet"
            component={withTracker(WalletScreen)}
        />
        <PrivateRoute
            exact
            path="/wallet/accounts/new"
            component={withTracker(NewAccountScreen)}
        />
        <PrivateRoute
          exact
          path="/payments/transfer_money"
          component={withTracker(TransferMoneyScreen)}
        />
        <PrivateRoute
            exact
            path="/payments/transfer_bonds"
            component={withTracker(TransferBondsScreen)}
        />
        <PrivateRoute
          exact
          path="/payments"
          component={withTracker(PaymentsListScreen)}
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
