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

const formSchema = yup.object({
  bond: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
  amount: yup
    .number()
    .moreThan(0)
    .required(),
});

interface PaymentFormViewProps extends FormikFormViewProps<TransferBondsDTO> {
  bondsAvaible: Bond[];
  fromAccounts: AccountKey[];
  toAccounts: Account[];
}

interface TransferBondsFormFields {
  bond: string;
  from: string;
  to: string;
  amount: string;
}

export const TransferBondsFormView: React.FC<PaymentFormViewProps> = ({
  onSubmit,
  isSubmitted,
  bondsAvaible,
  fromAccounts,
  toAccounts,
}) => {
  const [fromAccount, setFromAccount] = useState('');
  const bondsAvaibleFromAccount = fromAccount
    ? bondsAvaible
        .filter(b => getBalance(b, fromAccount))
        .map<TypeaheadOptions>(bond => ({
          id: bond.id,
          value:
            getBondTicker(bond) +
            ' [ amount: ' +
            getBalance(bond, fromAccount) +
            ' ]',
        }))
    : [];

  const fields = {
    from: {
      label: 'From account',
      type: 'autocomplete',
      options: fromAccounts.map<TypeaheadOptions>((account, index) => ({
        id: index.toString(),
        value: `${account.name} (${account.id})`,
      })),
      onChange: (value:string) => setFromAccount(fromAccounts[parseInt(value)].id),
    },

    bond: {
      label: 'Bond',
      placeholder: fromAccount
        ? `Avaiable bonds for ${fromAccount}`
        : 'Select from account to get avaible bonds',
      type: 'autocomplete',
      options: bondsAvaibleFromAccount,
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

  const initialValues : TransferBondsFormFields = {
    bond: '',
    from: '',
    to: '',
    amount: '0',
  }

  const alignTypesAndSubmit = (values: TransferBondsFormFields) => {
    console.log(values);
      onSubmit({
        bond: parseInt(values.bond),
        from: fromAccounts[parseInt(values.from.toString())],
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
