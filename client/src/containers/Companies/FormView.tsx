/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import * as yup from 'yup';
import {Company} from '../../core/companies';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';

const formSchema: yup.ObjectSchema = yup.object({
  bond: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
  amount: yup.number().required(),
});

const fields = {
  bond: {
    label: 'Bond',
  },

  from: {
    label: 'From account',
  },

  to: {
    label: 'To account',
  },

  amount: {
    label: 'Amount',
  },
};

export const CompanyFormView: React.FC<FormikFormViewProps<Company>> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
