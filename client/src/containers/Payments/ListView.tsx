/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Payment} from '../../core/payments';
import moment from 'moment';
import {getBondTicker} from '../../core/bonds';
import {numberWithCommas} from "../../utils/formaters";

interface PaymentsListProps {
  items: Payment[];
}

export const PaymentsList: React.FC<PaymentsListProps> = ({
  items,
}: PaymentsListProps) => {
  const renderLine = (h: Payment) => {
    const amountTD = h.isIncoming ? (
      <td className={'tx-color-03 text-right tx-teal'}>{'+' + numberWithCommas(h.amount)}</td>
    ) : (
      <td className={'tx-color-03 text-right tx-pink'}>{'-' + numberWithCommas(h.amount)}</td>
    );
    const currency = h.isMoney ? 'USD' : h.bond ? getBondTicker(h.bond) : '-';
    const from =  h.isIncoming ? ( <td className="text-left tx-medium">
      {h.sender?.company.name + ' (' + h.sender?.id + ')'}
    </td>) :  <td className="text-left tx-normal">
      {h.sender?.company.name + ' (' + h.sender?.id + ')'}
    </td>

    console.log("IDDD", h);
    return (
      <tr key={h.id + h.sender?.id}>
        {amountTD}

        <td className="tx-color-03 text-left">{currency}</td>
        {from}
        <td className="text-left tx-medium">
          {h.recipient?.company.name + ' ' + h.recipient?.id}
        </td>
      </tr>
    );
  };
  // tx-teal tx-pink
  console.log('ITEMS:', items);
  const renderTableContent = items.map(h => renderLine(h)) || 'Nothing to show';

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <div className="card card-dashboard-table">
        {/*<!-- card-body -->}*/}
        <div className="table-responsive">
          <Table className="table-dashboard mg-b-0" hover={true}>
            <thead>
              <tr>
                <th className='text-right'>Amount</th>
                <th>Currency</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>{renderTableContent}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
