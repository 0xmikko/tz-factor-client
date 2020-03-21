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
import {PaymentListItem} from "../../core/payments";
import moment from 'moment';

interface PaymentsListProps {
  items: PaymentListItem[];
  onItemSelected: (id: string) => void;
}

export const PaymentsList: React.FC<PaymentsListProps> = ({
  items,
    onItemSelected
}: PaymentsListProps) => {
  const renderLine = (h: PaymentListItem) => (
    <tr onClick={() => onItemSelected(h.id)}>
        <td className="tx-color-03 tx-normal">{
            h.issuer.toUpperCase() + moment(h.matureDate).format('YYYY-MM-DD')}
        </td>
      <td className="tx-color-03 text-left tx-normal">{h.amount}</td>
      {/* <td style={{textAlign: 'left'}}>{"/" + h.}</td> */}

      <td className="text-left tx-medium">{h.fromCompany}</td>
      <td className="text-left tx-medium">{h.toCompany}</td>
      <td className="text-right tx-medium">
          {h.status}
        {/*<span className="mg-l-5 tx-10 tx-normal tx-success">*/}
        {/*  <i className="icon ion-md-arrow-up"></i> 4.5%*/}
        {/*</span>*/}
      </td>
    </tr>
  );
// tx-teal tx-pink
    console.log("ITEMS:", items)
  const renderTableContent = items.map(h => renderLine(h)) || "Nothing to show";

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <div className="card card-dashboard-table">
        {/*<!-- card-body -->}*/}
        <div className="table-responsive">
          <Table className="table-dashboard mg-b-0" hover={true}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Amount</th>
                <th>Company</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {renderTableContent}

            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
