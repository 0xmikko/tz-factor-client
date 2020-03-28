/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {FaucetAccount} from '../../core/accounts';

const formSchema = yup.object({
  name: yup.string().required(),
  mnemonic: yup.string().required(),
  secret: yup.string().required(),
  pkh: yup.string().required(),
  password: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
});

interface AccountFundraiserFormViewProps
  extends FormikFormViewProps<FaucetAccount> {}

export const FundraiserFormView: React.FC<AccountFundraiserFormViewProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {


  const fields = {
    name: {
      label: 'Account name',
    },
    mnemonic: {
      label: 'Mnemonic',
    },
    secret: {
      label: 'Secret',
    },
    pkh: {
      label: 'Public key hash',
    },
    password: {
      label: 'Password',
    },
    email: {
      label: 'Email',
    },
  };

  const initialValues : FaucetAccount = {
    name: 'New account',
    mnemonic: '',
    secret: '',
    pkh: '',
    password: '',
    email: '',
  }

  const alignTypesAndSubmit = (values: FaucetAccount) => {
    values.mnemonic = values.mnemonic
        .split('"').join("")
        .split(',').join("")
        .split("  ").join(" ")
        .split("  ").join(" ")
        .split("  ").join(" ")
        .trim()
    onSubmit(values);
  };

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data || initialValues}
      onSubmit={alignTypesAndSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
