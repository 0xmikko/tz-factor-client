/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table, Card} from 'react-bootstrap';
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
        <strong>{moment(h.matureDate).format('YYYY/MM/DD')}</strong>
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
    <Card>
      <Card.Header className="card-header">
        <h6 className="mg-b-0">Bonds</h6>
      </Card.Header>
      <Card.Body className="pd-10">
        <div className="table-responsive">
          <Table className="table-borderless tx-13 mg-b-0">
            <thead>
              <tr className="tx-uppercase tx-10 tx-spacing-1 tx-semibold tx-color-03">
                <th>Mature date</th>
                <th className="text-right">Last Price</th>
                <th className="text-right">% Change</th>
              </tr>
            </thead>
            <tbody>{renderTableContent}</tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};
