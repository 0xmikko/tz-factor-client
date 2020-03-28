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
import {RouteComponentProps, useHistory} from 'react-router';
import {TransferBondsFormView} from '../../containers/Payments/TransferBondsFormView';
import {Payment, TransferBondsDTO} from '../../core/payments';
import actions from '../../store/actions';

export const TransferBondsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data,
  );

  const bondsAvaible = useSelector((state: RootState) => state.bonds.List.data);

  const fromAccounts = useSelector(
    (state: RootState) => state.accounts.LocalList.data,
  );

  const toAccounts = useSelector(
    (state: RootState) => state.accounts.List.data,
  );

  useEffect(() => {
    dispatch(actions.bonds.getList());
    dispatch(actions.accounts.getList());
  }, []);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus?.status) {
        case STATUS.SUCCESS:
          history.push('/payments/');
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant send bonds server. Error: ' + operationStatus?.error);
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: TransferBondsDTO) => {
    console.log(values);
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    dispatch(actions.payments.transferBonds(values, newHash));
  };

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'payments',
    },
  ];

  return (
    <div className="content content-fixed">
      <PageHeader title={'New bond payment'} breadcrumbs={breadcrumbs} />
      <TransferBondsFormView
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
        bondsAvaible={bondsAvaible}
        fromAccounts={fromAccounts}
        toAccounts={toAccounts}
      />
    </div>
  );
};
