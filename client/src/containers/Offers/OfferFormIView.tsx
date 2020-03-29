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
import {OfferCreateDTO} from '../../core/offers';
import {Loading} from '../../components/Loading';

const formSchema = yup.object({
  bond: yup.string().required(),
  from: yup.string().required(),

  amount: yup
    .number()
    .moreThan(0)
    .required(),

  discount: yup
    .number()
    .required()
    .moreThan(0)
    .lessThan(100),
});

interface PaymentFormViewProps extends FormikFormViewProps<OfferCreateDTO> {
  bondsAvaible: Bond[];
  fromAccounts: AccountKey[];
}

interface OfferBondsFormFields {
  bond: string;
  from: string;
  amount: string;
  discount: string;
}

export const OfferBondsFormView: React.FC<PaymentFormViewProps> = ({
  data,
  onSubmit,
  isSubmitted,
  bondsAvaible,
  fromAccounts,
}) => {
  const [fromAccount, setFromAccount] = useState('');

  if (!data || bondsAvaible.length === 0) return <Loading />;

  const currentBond = bondsAvaible[data.bondId];

  console.log('FFFF', bondsAvaible);

  const fields = {
    from: {
      label: 'From account',
      disabled: true,
    },

    bond: {
      label: 'Bond',
      disabled: true,
    },

    amount: {
      label: 'Amount',
    },
    discount: {
      label: 'Discount (% of bonds value)',
    },
  };

  const initialValues: OfferBondsFormFields = {
    bond:
      getBondTicker(currentBond) +
      ' [ amount: ' +
      getBalance(currentBond, data.account) +
      ' ]',
    from: data.account,
    amount: '0',
    discount: '0',
  };

  const alignTypesAndSubmit = (values: OfferBondsFormFields) => {
    console.log(values);
    onSubmit({
      bondId: data.bondId,
      account: data.account,
      amount: parseInt(values.amount),
      price: 100 - parseInt(values.discount),
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
