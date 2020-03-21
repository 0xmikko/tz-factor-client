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

import actions from '../../store/actions';
import {Payment} from '../../core/payments';
import {getDetailsItem} from '../../store/dataloader';
import {Loading} from '../../components/Loading';
import {STATUS} from "../../store/utils/status";

interface MatchParams {
  id: string;
  tab?: string;
}

interface PaymentDetailsScreenProps extends RouteComponentProps<MatchParams> {}

export const PaymentDetailsScreen: React.FC<PaymentDetailsScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: PaymentDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.payments.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.payments.Details, id),
  );

  if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
    // eslint-disable-next-line react/jsx-no-undef
    return <Loading />;
  }

  const {data} = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'payments',
    },
  ];

  const rightToolbar = (
    <div className="d-none d-md-block">
      <Button
        className="btn-sm pd-x-15 btn-brand-01 btn-uppercase"
        onClick={() => history.push(`/payments/${id}/edit/`)}>
        Edit
      </Button>
    </div>
  );

  return (
    <div className="content content-fixed">
      <PageHeader title={data.id} breadcrumbs={breadcrumbs} />
      <DetailsView data={data as Payment} />
    </div>
  );
};
