/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {DetailsView} from '../../containers/Bonds/DetailsView';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button} from 'react-bootstrap';
import {RouteComponentProps, useHistory} from 'react-router';

import actions from '../../store/actions';
import {STATUS} from "../../store/utils/status";
import {Loading} from "../../components/Loading";
import {getDetailsItem} from "../../store/dataloader";
import moment from 'moment';
import {getBondTicker} from "../../core/bonds";

interface MatchParams {
  id: string;
  tab?: string;
}

interface BondDetailsScreenProps
  extends RouteComponentProps<MatchParams> {}

export const BondDetailsScreen: React.FC<BondDetailsScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: BondDetailsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.bonds.connectSocket());
    dispatch(actions.bonds.getDetails(id));
  }, [dispatch, id]);

  const dataItem = useSelector((state: RootState) =>
    getDetailsItem(state.bonds.Details, id),
  );



  if (!dataItem || !dataItem.data || dataItem.status !== STATUS.SUCCESS) {
    return <Loading />;
  }

  const {data} = dataItem;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/bonds',
      title: 'Bonds',
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
        title={getBondTicker(data)}
        breadcrumbs={breadcrumbs}
      />
      <DetailsView data={data} />
    </div>
  );
};
