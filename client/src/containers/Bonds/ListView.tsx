/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Bond, getBondTicker} from '../../core/bonds';
import moment from 'moment';

interface BondsListProps {
  items: Bond[];
  onItemSelected: (id: string) => void;
}

export const BondsList: React.FC<BondsListProps> = ({
  items,
    onItemSelected
}: BondsListProps) => {
  const renderLine = (h: Bond) => (
    <tr onClick={() => onItemSelected(h.id)}>
      <td className="tx-color-03 tx-normal">{getBondTicker(h)}</td>
      <td className="text-center tx-medium">{moment(h.matureDate).format('YYYY-MM-DD')}</td>
      <td className="text-right tx-medium">{h.amount}</td>
      <td className="text-center tx-medium">
          {moment(h.createdAt).format('YYYY-MM-DD')}
        {/*<span className="mg-l-5 tx-10 tx-normal tx-success">*/}
        {/*  <i className="icon ion-md-arrow-up"></i> 4.5%*/}
        {/*</span>*/}
      </td>
    </tr>
  );
// tx-teal tx-pink
  const renderTableContent = items.map(h => renderLine(h));

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <div className="card card-dashboard-table">
        {/*<!-- card-body -->}*/}
        <div className="table-responsive">
          <Table className="table-dashboard mg-b-0" hover={true}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th className="text-center">Mature date</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Date of issue</th>
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
