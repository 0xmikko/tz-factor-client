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
import {numberWithCommas, toHumanDate} from '../../utils/formaters';

interface BondsListProps {
  items: Bond[];
  onItemSelected: (id: string) => void;
}

export const BondsList: React.FC<BondsListProps> = ({
  items,
  onItemSelected,
}: BondsListProps) => {
  const renderLine = (h: Bond) => (
    <tr onClick={() => onItemSelected(h.id)} key={h.id}>
      <td className="tx-color-03 tx-normal">{getBondTicker(h)}</td>
      <td className="text-center tx-medium">
        {toHumanDate(h.matureDate)}
      </td>
      <td className="text-right tx-medium">{numberWithCommas(h.total)}</td>
      <td className="text-center tx-medium">
        {toHumanDate(h.createdAt)}
      </td>
    </tr>
  );
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
                <th className="text-right">Total supply</th>
                <th className="text-right">Current supply</th>
                <th className="text-center">Avg. interest</th>
              </tr>
            </thead>
            <tbody>{renderTableContent}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
