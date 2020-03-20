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
import actions from '../../store/actions';
import {RootState} from '../../store';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {STATUS} from '../../store/utils/status';
import {Loading} from '../../components/Loading';
import {getDetailsItem} from '../../store/dataloader';
import {RouteComponentProps, useHistory} from 'react-router';
import {BondIssueFormView} from '../../containers/Bonds/FormIssueView';
import {Bond, BondCreateDTO} from "../../core/bonds";
import moment from 'moment';

interface MatchParams {
  id: string;
  tab?: string;
}

interface BondIssueScreenProps extends RouteComponentProps<MatchParams> {}

export const BondIssueScreen: React.FC<BondIssueScreenProps> = ({
  match: {
    params: {id, tab},
  },
}: BondIssueScreenProps) => {
  const dispatch = useDispatch();

  const history = useHistory();
  let operationStatus : STATUS;


  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  operationStatus = useSelector((state: RootState) =>
      state.bonds.Details?.hashes[hash]?.status);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {

        case STATUS.SUCCESS:
          history.push('/bonds/');
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert("Cant submit your operation to server")
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: BondCreateDTO) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.bonds.create(values));
  };


  const data : BondCreateDTO = {
    amount: 0,
    account: '18aceb2f-543a-4e02-a74d-12a070a30fb8',
    matureDate: moment(new Date()).add(1,'days').valueOf(),
  };

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/bonds',
      title: 'bonds',
    },
  ];

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Issue new bond '}
        breadcrumbs={breadcrumbs}
      />
      <BondIssueFormView data={data} onSubmit={onSubmit} isSubmitted={isSubmitted}/>
    </div>
  );
};
