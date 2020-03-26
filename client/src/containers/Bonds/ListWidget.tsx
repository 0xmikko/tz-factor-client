/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Bond} from '../../core/bonds';
import moment from 'moment';

interface BondsListProps {
  items: Bond[];
  onItemSelected: (id: string) => void;
}

export const BondsListWidget: React.FC<BondsListProps> = ({
  items,
  onItemSelected,
}: BondsListProps) => {
  const renderLine = (h: Bond) => (
    <tr onClick={() => onItemSelected(h.id)}>
      <td>
        <strong>{moment(h.matureDate).format("YYYY/MM/DD")}</strong>
      </td>
      <td className="text-right tx-rubik">${h.total}</td>
      <td className="text-right tx-rubik">
                  <span className="tx-danger">
                    0.77% <i className="icon ion-md-arrow-down"></i>
                  </span>
      </td>
    </tr>
  );
  // tx-teal tx-pink
  const renderTableContent = items.map(h => renderLine(h));

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mg-b-0">Bonds</h6>
      </div>
      <div className="card-body pd-10">
        <div className="table-responsive">
          <table className="table table-borderless tx-13 mg-b-0">
            <thead>
              <tr className="tx-uppercase tx-10 tx-spacing-1 tx-semibold tx-color-03">
                <th>Mature date</th>
                <th className="text-right">Last Price</th>
                <th className="text-right">% Change</th>
              </tr>
            </thead>
            <tbody>
            {renderTableContent}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
