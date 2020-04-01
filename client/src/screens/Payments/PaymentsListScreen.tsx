/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {PaymentsList} from '../../containers/Payments/ListView';
import {ToolbarButton} from '../../containers/ToolbarButton';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {RootState} from '../../store';
import actions from '../../store/actions';

export const PaymentsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
      dispatch(actions.payments.connectSocket())
    dispatch(actions.payments.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.payments.List);

  console.log(data);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'Payments',
    },
  ];

  const rightToolbar = (
    <>
      <ToolbarButton
        title={'Pay'}
        onClick={() => history.push('/payments/transfer_money/')}
      />
      <ToolbarButton
        title={'Pay with Bonds'}
        onClick={() => history.push('/payments/transfer_bonds/')}
      />
    </>
  );

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Payments'}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      {status === STATUS.SUCCESS ? (
        <PaymentsList items={data}  />
      ) : (
        <Loading />
      )}
    </div>
  );
};
