/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {CompanyFormView} from '../../containers/Companies/FormView';
import {Loading} from '../../components/Loading';

import {getDetailsItem} from '../../store/dataloader';
import {STATUS} from '../../store/utils/status';
import {RootState} from '../../store';
import {Company} from '../../core/companies';
import actions from '../../store/actions';

export const CompanyEditScreen: React.FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const id = useSelector((state: RootState) => state.profile.id);

  const operationStatus = useSelector(
      (state: RootState) => state.operations.data[hash]?.data,
  );

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus?.status) {
        case STATUS.SUCCESS:
          history.push('/payments/' + data.id);
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant submit your operation to server');
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: Company) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    // dispatch(actions.createUpdateDetails(data.id, values, newHash))
  };

  useEffect(() => {
    if (id) dispatch(actions.companies.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.companies.Details, id || '0'),
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


  return (
    <div className="content content-fixed">
      <PageHeader
        title={data.name}
        breadcrumbs={breadcrumbs}
      />
      <CompanyFormView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
