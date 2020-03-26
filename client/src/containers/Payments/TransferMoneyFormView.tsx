/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Payment, TransferBondsDTO, TransferMoneyDTO} from '../../core/payments';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {TypeaheadOptions} from '../../components/Forms/AutoCompleteField';
import {Account, AccountKey} from '../../core/accounts';

const formSchema = yup.object({
  from: yup.string().required(),
  to: yup.string().required(),
  amount: yup
    .number()
    .moreThan(0)
    .required(),
});

interface PayFormViewProps extends FormikFormViewProps<TransferMoneyDTO> {
  fromAccounts: AccountKey[];
  toAccounts: Account[];
}

interface TransferMoneyFormFields {
  from: string;
  to: string;
  amount: string;
}

export const TransferMoneyFormView: React.FC<PayFormViewProps> = ({
  onSubmit,
  isSubmitted,
  fromAccounts,
  toAccounts,
}) => {
  const fields = {
    from: {
      label: 'From account',
      type: 'autocomplete',
      options: fromAccounts.map<TypeaheadOptions>((account, index) => ({
        id: index.toString(),
        value: `${account.name} (${account.id})`,
      })),
    },

    to: {
      label: 'To account',
      type: 'autocomplete',
      options: toAccounts.map<TypeaheadOptions>(account => ({
        id: account.id,
        value: `${account.id} (${account.company.name})`,
      })),
    },

    amount: {
      label: 'Amount',
    },
  };

  const initialValues: TransferMoneyFormFields = {
    from: '',
    to: '',
    amount: '0',
  };

  const alignTypesAndSubmit = (values: TransferMoneyFormFields) => {
    onSubmit({
      from: fromAccounts[parseInt(values.from)],
      to: values.to,
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
