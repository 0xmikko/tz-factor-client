/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond} from '../../core/bonds';
import * as yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Button, FormLabel} from 'react-bootstrap';

const formSchema = yup.object({

  one_liner: yup.string().required(),
  description: yup.string().required(),
  title: yup.string().min(5),
  meta_keywords: yup.string(),
  meta_description: yup.string(),

});

interface Field {
  label: string;
  type?: 'input' | 'textarea';
}

type FormFields = {[T in keyof yup.InferType<typeof formSchema>]: Field};

interface BondFormProps {
  data: Bond;
  onSubmit: (values: Bond) => void;
  isSubmitted: boolean
}

export const BondFormView: React.FC<BondFormProps> = ({
  data, onSubmit, isSubmitted
}: BondFormProps) => {

  const initialValues: Bond = data;

  const fields: FormFields = {
    one_liner: {
      label: 'One liner',
    },

    description: {
      label: 'Description',
      type: 'textarea',
    },

    title: {
      label: 'Title',
    },

    meta_keywords: {
      label: 'Meta keywords',
    },

    meta_description: {
      label: 'Meta description',
      type: 'textarea',
    },

  };

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
        onSubmit={onSubmit}>
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
