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
import {FormikForm, FormikFormViewProps} from "../../components/Forms/FormikForm";

const formSchema = yup.object({
  matureDate: yup.date().required(),
  amount: yup.number().required().moreThan(0),
  account: yup.string().min(5),
});

interface BondFormFields {
  matureDate: string,
  amount: string,
  account: string,

}

export const BondIssueFormView: React.FC<FormikFormViewProps<BondCreateDTO>> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {

  const initialValues : BondFormFields = {
    matureDate: moment(data.matureDate).format('YYYY-MM-DD'),
    amount: data.amount.toString(),
    account: data.account,
  }

  const fields  = {
    matureDate: {
      label: 'Mature Date',
    },

    amount: {
      label: 'Amount',
    },

    account: {
      label: 'Account',
    },
  };

  function alignTypesAndSubmit (values: BondFormFields) {
    onSubmit({
      // Convert items from string to int & data
      amount: parseInt(values.amount),
      matureDate: Date.parse(values.matureDate).valueOf(),
      account: values.account,
    })
  }

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
