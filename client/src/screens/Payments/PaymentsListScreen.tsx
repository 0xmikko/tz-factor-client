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
import {useDispatch} from 'react-redux';
import * as actions from '../../store/payments/actions';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {Payment} from '../../core/payments';
import {ToolbarButton} from '../../containers/ToolbarButton';

export const R_PaymentsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.getList());
  }, [dispatch]);

  // const {data, status} = useSelector((state: RootState) => state.landings.List);
  const data: Payment[] = [
    {
      id: '123-213-90',
      date: new Date(),
      from: {
        id: 'qweqwe',
        company: {
          id: '123124',
          name: 'Spar',
          address: '12323',
          type: 'ISSUER',
          taxId: '123',
        },
      },

      to: {
        id: '312-123213-23',
        company: {
          id: '124124214',
          name: 'Milk Austria',
          address: '12323',
          type: 'ISSUER',
          taxId: '123',
        },
      },
      amount: 23.23,
      status: 'CONFIRMED',
      bond: {
        id: '123-23',
        createdAt: new Date(),
        amount: 232323,
        matureDate: new Date(),
        issuer: {
          id: '123124',
          name: 'Spar',
          address: '12323',
          type: 'ISSUER',
          taxId: '123',
        },
      },
    },
  ];

  const status: STATUS = STATUS.SUCCESS;

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
        <PaymentsList items={data} onItemSelected={onItemSelected} />
      ) : (
        <Loading />
      )}
    </div>
  );
};
