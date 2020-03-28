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
import {FormViewProfile} from '../../containers/Companies/FormViewProfile';
import {Loading} from '../../components/Loading';

import {getDetailsItem} from '../../store/dataloader';
import {STATUS} from '../../store/utils/status';
import {RootState} from '../../store';
import actions from '../../store/actions';
import {Company} from "../../core/companies";

export const CompanyEditProfileScreen: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector((state: RootState) =>
      state.operations.data[hash]?.data?.status);

  const id = useSelector((state: RootState) => state?.auth?.access?.user_id);
  console.log(id);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          history.push(`/companies/${id}`);
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant submit your operation to server');
      }
    }
  }, [hash, operationStatus]);


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
      url: '/profile',
      title: 'profile',
    },
  ];

  const onSubmit = (values: Company) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.companies.updateProfile(values, newHash));
  };


  return (
    <div className="content content-fixed">
      <PageHeader
        title='Profile'
        breadcrumbs={breadcrumbs}
      />
      <FormViewProfile
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
