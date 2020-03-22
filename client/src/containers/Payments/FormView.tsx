/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Payment, PaymentCreateDTO} from '../../core/payments';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {Bond, getBondTicker} from '../../core/bonds';
import {TypeaheadOptions} from '../../components/Forms/AutoCompleteField';
import {Account} from "../../core/companies";

const formSchema = yup.object({
  bond: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
  amount: yup.number().moreThan(0).required(),
});

interface PaymentFormViewProps extends FormikFormViewProps<PaymentCreateDTO> {
  bondsAvaible: Bond[];
  toAccounts: Account[];
}

export const PaymentFormView: React.FC<PaymentFormViewProps> = ({
  data,
  onSubmit,
  isSubmitted,
  bondsAvaible,
  toAccounts,
}) => {

  const fields = {
    bond: {
      label: 'Bond',
      type: 'autocomplete',
      options: bondsAvaible.map<TypeaheadOptions>(bond => ({
        id: bond.id,
        value: getBondTicker(bond),
      })),
    },

    from: {
      label: 'From account',
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

  const alignTypesAndSubmit =(values: PaymentCreateDTO) => {
    values.amount = parseInt(values.amount.toString())
    onSubmit(values)
  }

  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data}
      onSubmit={alignTypesAndSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
