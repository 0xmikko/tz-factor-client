/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {DetailsView} from '../../containers/Payments/DetailsView';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {RouteComponentProps, useHistory} from 'react-router';

import * as actions from '../../store/payments/actions';
import {Payment} from "../../core/payments";

interface MatchParams {
  id: string;
  tab?: string;
}

interface PaymentDetailsScreenProps
  extends RouteComponentProps<MatchParams> {}

export const PaymentDetailsScreen: React.FC<PaymentDetailsScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: PaymentDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // dispatch(actions.getDetails(id));
  }, [dispatch, id]);

  // const dataItem = useSelector((state: RootState) =>
  //   getDetailsItem(state.payments.Details, id),
  // );
  //


  // if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
  //   return <Loading />;
  // }
  //
  // const {data} = dataItem;

  const data : Payment = {
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
      issuedAt: new Date(),
      amount: 232323,
      matureDate: new Date(),
      issuer: {
        id: '123124',
        name: 'Spar Limited Co.',
        address: '12323',
        type: 'ISSUER',
        taxId: '123',
      },
    },
  }

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'payments',
    },
  ];

  const rightToolbar = (
    <div className="d-none d-md-block">
      <Button className="btn-sm pd-x-15 btn-brand-01 btn-uppercase" onClick={() => history.push(`/payments/${id}/edit/`)}>
        Edit
      </Button>
    </div>
  );

  return (
    <div className="content content-fixed">
      <PageHeader
        title={data.id}
        breadcrumbs={breadcrumbs}
      />
      <DetailsView data={data} />
    </div>
  );
};
