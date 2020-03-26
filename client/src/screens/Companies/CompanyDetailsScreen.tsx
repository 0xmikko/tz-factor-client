/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {DetailsView} from '../../containers/Companies/DetailsView';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {RouteComponentProps, useHistory} from 'react-router';

import actions from '../../store/actions';
import {Payment} from '../../core/payments';
import {Company} from '../../core/companies';
import {IssuerDetailsView} from '../../containers/Companies/IssuerDetailsView';
import {STATUS} from '../../store/utils/status';
import {Loading} from '../../components/Loading';
import {getDetailsItem} from '../../store/dataloader';

interface MatchParams {
  id: string;
  tab?: string;
}

interface CompanyDetailsScreenProps extends RouteComponentProps<MatchParams> {}

export const CompanyDetailsScreen: React.FC<CompanyDetailsScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: CompanyDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.companies.getDetails(id));
    dispatch(actions.bonds.getList());
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.companies.Details, id),
  );

  const bondsList = useSelector((state: RootState) => state.bonds.List.data);

  if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
    return <Loading />;
  }

  const {data} = dataItem;

  const companyBonds = bondsList.filter(a => a.issuer.id === id);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/companies',
      title: 'Companies',
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
      <PageHeader title={data.name} breadcrumbs={breadcrumbs} />
      <IssuerDetailsView data={data} companyBonds={companyBonds} />
    </div>
  );
};
