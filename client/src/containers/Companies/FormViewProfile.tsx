/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond, BondCreateDTO} from '../../core/bonds';
import * as yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Button, FormLabel} from 'react-bootstrap';
import moment from 'moment';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';
import {TypeaheadOptions} from '../../components/Forms/AutoCompleteField';
import {TransferBondsDTO} from '../../core/payments';
import {AccountKey} from '../../core/accounts';
import {Company, UpsertCompanyProfileDTO} from '../../core/companies';
import {Loading} from '../../components/Loading';

const formSchema = yup.object({
  name: yup.string().required(),
  orgType: yup.string(),
  industry: yup.string(),
  founder: yup.string(),
  headquaters: yup.string(),
  numberOfEmployees: yup.number(),
  product: yup.string(),
  revenue: yup.string(),
  website: yup.string(),
});

interface FormViewProfileProps extends FormikFormViewProps<Company> {}

export const FormViewProfile: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {
  const fields = {
    name: {
      label: 'Company name',
    },
    orgType: {
      label: 'Organisation type (private / public)',
    },
    industry: {
      label: 'Industry',
    },
    founder: {
      label: 'Founded',
    },
    headquaters: {
      label: 'Headquaters',
    },
    numberOfEmployees: {
      label: 'Number of employees',
    },
    product: {
      label: 'Product',
    },
    revenue: {
      label: 'Revenue',
    },
    website: {
      label: 'Website',
    },
  };

  if (!data) return <Loading />;

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
