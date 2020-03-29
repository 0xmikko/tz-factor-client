/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, useHistory} from 'react-router';

import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {OfferBondsFormView} from '../../containers/Offers/OfferFormIView';

import {RootState} from '../../store';
import {STATUS} from '../../store/utils/status';
import actions from '../../store/actions';
import {OfferBuyDTO, OfferCreateDTO} from '../../core/offers';
import {OfferBuyBondsFormView} from '../../containers/Offers/OfferBuyFormView';
import {Loading} from "../../components/Loading";

interface MatchParams {
  id: string;
  bondId: string;
}

interface OfferBondsScreenProps extends RouteComponentProps<MatchParams> {}

export const OfferBuyBondsScreen: React.FC<OfferBondsScreenProps> = ({
  match: {
    params: {id, bondId},
  },
}: OfferBondsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data,
  );

  const bonds = useSelector((state: RootState) => state.bonds.List.data);
  const fromAccounts = useSelector(
    (state: RootState) => state.accounts.LocalList.data,
  );

  const data: OfferBuyDTO = {
    offerId: id,
    account: '',
    amount: 0,
  };

  useEffect(() => {
    dispatch(actions.bonds.getList());
    dispatch(actions.accounts.getList());
  }, []);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus?.status) {
        case STATUS.SUCCESS:
          history.push('/payments/');
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Cant send bonds server. Error: ' + operationStatus?.error);
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: OfferBuyDTO) => {
    console.log(values);
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    dispatch(actions.offers.buyOffer(values, newHash));
  };

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/payments',
      title: 'payments',
    },
  ];

  const bond = bonds[parseInt(bondId)];
  if (!bond) return <Loading/>

  const offers = bond.offers.filter(o => (o.id === id))
  if (!offers) return <div>Internal error</div>
  const currentOffer = offers[0];

  return (
    <div className="content content-fixed">
      <PageHeader title={'New bond offer'} breadcrumbs={breadcrumbs} />
      <OfferBuyBondsFormView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
        bond={bond}
        offer={currentOffer}
        fromAccounts={fromAccounts}
      />
    </div>
  );
};
