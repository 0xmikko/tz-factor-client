import React from 'react';
import {Button, FormLabel} from 'react-bootstrap';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup';

export interface FieldI {
  label: string;
  type?: 'input' | 'textarea';
}

export interface FormikFormViewProps<T> {
  data: T;
  onSubmit: (values: T) => void;
  isSubmitted: boolean;
}

interface FormikFormProps<T, S> {
  formSchema: yup.ObjectSchema;
  fields: {[T in keyof yup.InferType<S>]: FieldI};
  initialValues: T;
  onSubmit: (values: T) => void;
  isSubmitted: boolean;
}
export function FormikForm<T, S>({
  formSchema,
  fields,
  initialValues,
  onSubmit,
  isSubmitted,
}: FormikFormProps<T, S>): React.ReactElement {
  const fieldsRendered = Object.entries(fields).map(e => {
    const name = e[0];
    const f = e[1] as FieldI;

    return (
      <>
        <FormLabel>{f?.label}</FormLabel>
        <Field
          placeholder={f?.label}
          name={name}
          component={f?.type || 'input'}
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
}
