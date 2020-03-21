/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {PaymentsList} from '../../containers/Payments/ListView';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/payments/actions';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {Payment} from '../../core/payments';
import {ToolbarButton} from '../../containers/ToolbarButton';
import {RootState} from "../../store";
import {PaymentListItem} from "../../core/payments";

export const R_PaymentsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.payments.List);

  console.log(data)

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'Payments',
    },
  ];

  const onPay = () => {
    history.push('/payments/new/edit/');
    // dispatch(actions.reload());
  };

  const rightToolbar = (
    <>
      <ToolbarButton title={'Pay'} onClick={onPay} />
    </>
  );

  const onItemSelected = (id: string) => history.push(`/payments/${id}`);

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Payments'}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      {status === STATUS.SUCCESS ? (
        <PaymentsList items={data as PaymentListItem[]} onItemSelected={onItemSelected} />
      ) : (
        <Loading />
      )}
    </div>
  );
};
