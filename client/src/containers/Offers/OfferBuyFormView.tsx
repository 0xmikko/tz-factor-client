/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useState} from 'react';
import {Payment, TransferBondsDTO} from '../../core/payments';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {Bond, getBalance, getBondTicker} from '../../core/bonds';
import {TypeaheadOptions} from '../../components/Forms/AutoCompleteField';
import {Account, AccountKey} from '../../core/accounts';
import {Offer, OfferBuyDTO, OfferCreateDTO} from '../../core/offers';
import {Loading} from '../../components/Loading';


interface PaymentFormViewProps extends FormikFormViewProps<OfferBuyDTO> {
  bond: Bond;
  offer: Offer;
  fromAccounts: AccountKey[];
}

interface OfferBondsFormFields {
  from: string;
  amount: string;
}

export const OfferBuyBondsFormView: React.FC<PaymentFormViewProps> = ({
  data,
  onSubmit,
  isSubmitted,
  bond,
    offer,
  fromAccounts,
}) => {
  const [fromAccount, setFromAccount] = useState('');

  if (!data || !offer) return <Loading />

  const MaxSupply = offer.amount - offer.sold;

  const formSchema = yup.object({
    from: yup.string().required(),
    amount: yup
        .number()
        .moreThan(0)
        .lessThan(MaxSupply)
        .required(),
  });


  const fields = {
    from: {
      label: 'From account',
      type: 'autocomplete',
      options: fromAccounts.map<TypeaheadOptions>((account, index) => ({
        id: index.toString(),
        value: `${account.name} (${account.id})`,
      })),
    },

    amount: {
      label: 'Amount',
    },
  };

  const initialValues: OfferBondsFormFields = {
    from: '',
    amount: '0',
  };

  const alignTypesAndSubmit = (values: OfferBondsFormFields) => {
    console.log(values);
    onSubmit({
      offerId: data.offerId,
      account: fromAccounts[parseInt(values.from)].id,
      amount: parseInt(values.amount),
    });
  };

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={initialValues}
      onSubmit={alignTypesAndSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
