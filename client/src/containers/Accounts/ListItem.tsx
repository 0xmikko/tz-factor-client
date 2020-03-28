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
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {useHistory} from "react-router";
import {RootState} from "../../store";
import {STATUS} from "../../store/utils/status";

interface AccountsListItemProps {
  item: AccountKey;
  registeredAccounts: Account[];
}

export const AccountsListItem: React.FC<AccountsListItemProps> = ({
  item,
  registeredAccounts,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
      (state: RootState) => state.operations.data[hash]?.data,
  );

  const onButtonPressed = (id: string, operation: string) => {
    const opHash = Date.now().toString();
    setHash(opHash);
    switch (operation) {
      case 'Register':
        dispatch(actions.accounts.registerAccount(id, opHash));
        break;
      case 'Deposit':
        dispatch(actions.accounts.deposit(id, opHash));
        break;
    }

  };

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus?.status) {
        // case STATUS.SUCCESS:
        //   history.push('/payments/');
        //   break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant send bonds server. Error: ' + operationStatus?.error);
      }
    }
  }, [hash, operationStatus]);


  let actionButton: React.ReactElement;

  const isButtonDisabled = (operationStatus?.status === STATUS.LOADING)
  console.log(operationStatus, isButtonDisabled)

  for (const a of registeredAccounts) {
    console.log('HOHA', item, a);
    if (item.id === a.id) {
      item.status = 'Registered';
      item.amount = a.amount;
      break;
    }
  }

  switch (item.status) {
    default:
    case 'New':
      actionButton = (
        <Button
          size="sm"
          variant="outline-primary"
          disabled={isButtonDisabled}
          onClick={() => dispatch(actions.accounts.RevealAccount(item))}>
          { isButtonDisabled ? 'In progress' : 'Reaveal'}

        </Button>
      );
      break;
    case 'Revealed':
      actionButton = (
        <Button
          size="sm"
          variant="outline-primary"
          disabled={isButtonDisabled}
          onClick={() => onButtonPressed(item.id, 'Register')}>
          { isButtonDisabled ? 'In progress' : 'Register'}
        </Button>
      );
      break;
    case 'Registered':
      actionButton = (
        <Button
          size="sm"
          variant="outline-primary"
          disabled={isButtonDisabled}
          onClick={() => onButtonPressed(item.id, 'Deposit')}>
          { isButtonDisabled ? 'In progress' : 'Deposit'}
        </Button>
      );
      break;
  }
  return (
    <tr>
      <td className="tx-color-03 tx-normal text-left">{item.name}</td>
      <td className="tx-color-03 tx-normal text-left">{item.id}</td>
      <td className="tx-color-03 tx-normal text-center">{item.amount}</td>
      <td className="tx-color-03 tx-normal text-center">{item.status}</td>
      <td className="tx-color-03 tx-normal text-center">{actionButton}</td>
    </tr>
  );
};
