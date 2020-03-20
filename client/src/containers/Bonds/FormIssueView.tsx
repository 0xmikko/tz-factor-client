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

const formSchema = yup.object({
  matureDate: yup.date().required(),
  amount: yup.number().required().moreThan(0),
  account: yup.string().min(5),
});

interface Field {
  label: string;
  type?: 'input' | 'textarea';
}

type FormFields = {[T in keyof yup.InferType<typeof formSchema>]: Field};

interface BondFormProps {
  data: BondCreateDTO;
  onSubmit: (values: BondCreateDTO) => void;
  isSubmitted: boolean;
}

interface BondFormFields {
  matureDate: string,
  amount: string,
  account: string,

}

export const BondIssueFormView: React.FC<BondFormProps> = ({
  data,
  onSubmit,
  isSubmitted,
}: BondFormProps) => {

  const initialValues : BondFormFields = {
    matureDate: moment(data.matureDate).format('YYYY-MM-DD'),
    amount: data.amount.toString(),
    account: data.account,
  }

  const fields: FormFields = {
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

  const fieldsRendered = Object.entries(fields).map(e => {
    const name = e[0];

    return (
      <>
        <FormLabel>{e[1]?.label}</FormLabel>
        <Field
          placeholder={e[1]?.label}
          name={name}
          component={e[1]?.type || 'input'}
        />
        <ErrorMessage name={name} component="div" className="feedback" />
      </>
    );
  });

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <hr />
      <Formik
        validationSchema={formSchema}
        initialValues={initialValues}
        onSubmit={alignTypesAndSubmit}>
        <Form className="form">
          {fieldsRendered}
          <Button
            type={'submit'}
            className="theme-button"
            disabled={isSubmitted}>
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
