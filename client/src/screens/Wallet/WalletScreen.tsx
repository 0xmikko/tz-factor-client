/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import TabsBar from '../../components/PageHeader/TabsBar';
import {TabPane} from '../../components/PageHeader/TabPane';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {AccountsListTab} from './AccountsListTab';
import {BondsListTab} from './BondsListTab';

export const WalletScreen: React.FC = ({}) => {
  const tabs: string[] = ['Accounts', 'Bonds', "Payments calendar"];

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/wallet',
      title: 'Wallet',
    },
  ];
  return (
    <div className="content content-fixed">
      <PageHeader title={'Wallet'} breadcrumbs={breadcrumbs} />
      <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-15-f">
        <TabsBar tabs={tabs} selected={'info'} />
        <TabPane hash={'#accounts'}>
          <AccountsListTab />
        </TabPane>
        <TabPane hash={'#bonds'}>
          <BondsListTab />
        </TabPane>
      </div>
    </div>
  );
};
