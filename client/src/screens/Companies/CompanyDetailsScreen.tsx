/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, useHistory} from 'react-router';

import {RootState} from '../../store';

import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {DetailsViewIssuer} from '../../containers/Companies/DetailsViewIssuer';
import {DetailsViewSupplier} from '../../containers/Companies/DetailsViewSupplier';

import actions from '../../store/actions';
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

  const detailView =
    data.type === 'ISSUER' ? (
      <DetailsViewIssuer data={data} companyBonds={companyBonds} />
    ) : (
      <DetailsViewSupplier data={data} />
    );
  return (
    <div className="content content-fixed">
      <PageHeader title={data.name} breadcrumbs={breadcrumbs} />
      {detailView}
    </div>
  );
};
