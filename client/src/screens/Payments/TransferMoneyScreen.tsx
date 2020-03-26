/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect, useState} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {STATUS} from '../../store/utils/status';
import { useHistory} from 'react-router';
import {TransferMoneyFormView} from '../../containers/Payments/TransferMoneyFormView';
import {Payment, TransferBondsDTO, TransferMoneyDTO} from '../../core/payments';
import actions from '../../store/actions';

export const TransferMoneyScreen: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  let operationStatus: STATUS;

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const data: TransferMoneyDTO = {
    to: '',
    amount: 0,
  };

  operationStatus = useSelector((state: RootState) =>
      state.operations.data[hash]?.status);

  const fromAccounts = useSelector((state: RootState) =>
      state.accounts.LocalList.data);

  const toAccounts = useSelector((state: RootState) =>
      state.accounts.List.data);

  useEffect(() => {
    dispatch(actions.accounts.getList());
  }, []);


  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push('/payments/');
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant submit your operation to server');
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: TransferMoneyDTO) => {
    console.log(values)
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    dispatch(actions.payments.transferMoney(newHash, values));
  };

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'payments',
    },
  ];


  return (
    <div className="content content-fixed">
      <PageHeader title={'New payment'} breadcrumbs={breadcrumbs} />
      <TransferMoneyFormView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
        fromAccounts={fromAccounts}
        toAccounts={toAccounts}
      />
    </div>
  );
};
