/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import {Account, AccountKey} from '../../core/accounts';
import {AccountsListItem} from './ListItem';

interface AccountsListProps {
  items: AccountKey[];
  registeredAccounts: Account[];
}

export const AccountsList: React.FC<AccountsListProps> = ({
  items,
  registeredAccounts,
}: AccountsListProps) => {

  // tx-teal tx-pink
  const renderTableContent = items.map(h => (
    <AccountsListItem item={h} registeredAccounts={registeredAccounts} key={h.id} />
  ));

  return (
    <div className="card card-dashboard-table mg-t-20">
      {/*<!-- card-body -->}*/}
      <div className="table-responsive">
        <Table className="table-dashboard mg-b-0" hover={true}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{renderTableContent}</tbody>
        </Table>
      </div>
    </div>
  );
};
