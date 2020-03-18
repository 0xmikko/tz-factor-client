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
import * as actions from '../../store/payments/actions';
import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {STATUS} from '../../store/utils/status';
import {Loading} from '../../components/Loading';
import {getDetailsItem} from '../../store/dataloader';
import {RouteComponentProps, useHistory} from 'react-router';
import {PaymentFormView} from '../../containers/Payments/FormView';
import {Payment} from "../../core/payments";

interface MatchParams {
  id: string;
  tab?: string;
}

interface PaymentDetailsScreenProps extends RouteComponentProps<MatchParams> {}

export const CompanyEditScreen: React.FC<PaymentDetailsScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: PaymentDetailsScreenProps) => {
  const dispatch = useDispatch();

  const history = useHistory();
  let operationStatus : STATUS;


  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  operationStatus = useSelector((state: RootState) =>
      state.payments.Details.hashes[hash].status);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {

        case STATUS.SUCCESS:
          history.push('/payments/' + data.id );
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert("Cant submit your operation to server")
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: Payment) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    // dispatch(actions.createUpdateDetails(data.id, values, newHash))
  };


  useEffect(() => {
    // dispatch(actions.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.payments.Details, id),
  );

  if (!dataItem || !dataItem.data) {
    return <Loading />;
  }

  if (dataItem.status === STATUS.FAILURE) {
    return <>"Oops! Error happened!"</>;
  }


  if (dataItem.status === STATUS.LOADING) {
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
      <Button className="btn-sm pd-x-15 btn-brand-01 btn-uppercase">
        Edit
      </Button>
    </div>
  );

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Payment #' + data.id}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      <PaymentFormView data={data} onSubmit={onSubmit} isSubmitted={isSubmitted}/>
    </div>
  );
};
