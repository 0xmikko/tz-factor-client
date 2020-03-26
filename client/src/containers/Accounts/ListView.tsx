/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect} from 'react';
import {Button, Table} from 'react-bootstrap';
import {Account, AccountKey} from '../../core/accounts';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {useHistory} from "react-router";

interface AccountsListProps {
  items: AccountKey[];
  registeredAccounts: Account[];
}

export const AccountsList: React.FC<AccountsListProps> = ({
  items,
  registeredAccounts,
}: AccountsListProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const onRegisterAccount =  (id: string) => {
    const opHash = Date.now().toString();
    dispatch(actions.accounts.registerAccount(id, opHash));
  }

  const onDeposit = (id: string) => {
    const opHash = Date.now().toString();
    dispatch(actions.accounts.deposit(id, opHash));
  }


  const renderLine = (h: AccountKey) => {
    let actionButton: React.ReactElement;

    for (const a of registeredAccounts) {
      console.log('HOHA', h, a);
      if (h.id === a.id) {
        h.status = 'Registered';
        h.amount = a.amount;
        break;
      }
    }

    switch (h.status) {
      default:
      case 'New':
        actionButton = (
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => dispatch(actions.accounts.RevealAccount(h))}>
            Reaveal
          </Button>
        );
        break;
      case 'Revealed':
        actionButton = (
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => onRegisterAccount(h.id)}>
            Register
          </Button>
        );
        break;
      case 'Registered':
        actionButton =  <Button
            size="sm"
            variant="outline-primary"
            onClick={() => onDeposit(h.id)}>
            Deposit
        </Button>
        break;
    }

    return (
      <tr>
        <td className="tx-color-03 tx-normal text-left">{h.name}</td>
        <td className="tx-color-03 tx-normal text-left">{h.id}</td>
        <td className="tx-color-03 tx-normal text-center">{h.amount}</td>
        <td className="tx-color-03 tx-normal text-center">{h.status}</td>
        <td className="tx-color-03 tx-normal text-center">{actionButton}</td>
      </tr>
    );
  };
  // tx-teal tx-pink
  const renderTableContent = items.map(h => renderLine(h));

  return (
    <div className="card card-dashboard-table mg-t-20">
      {/*<!-- card-body -->}*/}
      <div className="table-responsive">
        <Table className="table-dashboard mg-b-0" hover={true}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th className='text-center'>Amount</th>
              <th className='text-center'>Status</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableContent}</tbody>
        </Table>
      </div>
    </div>
  );
};
