/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Company} from '../../core/companies';

interface CompanysListProps {
  items: Company[];
  onItemSelected: (id: string) => void;
}

export const R_CompanysList: React.FC<CompanysListProps> = ({
  items,
    onItemSelected
}: CompanysListProps) => {
  const renderLine = (h: Company) => (
    <tr onClick={() => onItemSelected(h.id)}>
      <td className="tx-color-03 tx-normal">{h.name}</td>
      <td style={{textAlign: 'left'}}>{h.address}</td>

      <td className="text-right tx-medium">{h.taxId}</td>

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
                <th>Name</th>
                <th>URL</th>
                <th className="text-right">Opened</th>
                <th className="text-right">Goals</th>
                <th className="text-right">Signups</th>
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
