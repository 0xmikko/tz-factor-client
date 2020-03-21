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
import {PaymentFormView} from '../../containers/Payments/FormView';
import {Payment, PaymentCreateDTO} from '../../core/payments';
import actions from '../../store/actions';

interface PaymentsPayScreenProps {
  data: PaymentCreateDTO;
}

export const PaymentsPayScreen: React.FC<PaymentsPayScreenProps> = ({data}) => {
  const dispatch = useDispatch();

  const history = useHistory();
  let operationStatus: STATUS;

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  operationStatus = useSelector(
    (state: RootState) => state.payments.Details.hashes[hash].status,
  );

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

  const onSubmit = (values: PaymentCreateDTO) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    dispatch(actions.payments.pay(values))
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
      <PaymentFormView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
