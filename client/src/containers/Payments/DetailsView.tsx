/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Payment} from '../../core/payments';
import TabsBar from '../../components/PageHeader/TabsBar';
import {TabPane} from '../../components/PageHeader/TabPane';
import {InfoWidget} from './InfoWidget';

interface PaymentDetailsProps {
  data: Payment;
}

export const DetailsView: React.FC<PaymentDetailsProps> = ({
  data,
}: PaymentDetailsProps) => {
  const tabs: string[] = ['Info', 'Budget'];

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <TabsBar tabs={tabs} selected={'info'} />
      <TabPane hash={'#info'}>
        <InfoWidget data={data} />
      </TabPane>
      <TabPane hash={'#budget'}>Budget</TabPane>
      {/*<TabPane hash={'budget'}>Hello, budget</TabPane>*/}
    </div>
  );
};
