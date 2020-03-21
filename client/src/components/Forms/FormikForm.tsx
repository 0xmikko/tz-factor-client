import React from 'react';
import {Button, FormLabel} from 'react-bootstrap';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as yup from 'yup';
import {FieldProps} from 'formik/dist/Field';
import AutoCompleteField, {TypeaheadOptions} from './AutoCompleteField';
import {FormikConfig} from 'formik/dist/types';

export interface FieldI {
  label: string;
  type?: 'input' | 'textarea' | 'autocomplete';
  options?: TypeaheadOptions[];
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

type FieldComponent =
  | string
  | React.ComponentType
  | React.ForwardRefExoticComponent<any>;

export function FormikForm<T, S>({
  formSchema,
  fields,
  initialValues,
  onSubmit,
  isSubmitted,
}: FormikFormProps<T, S>): React.ReactElement {
  function getComponent(
    name: string,
    f: FieldI,
    {setFieldValue}: FormikHelpers<T>,
  ): React.ReactElement {
    switch (f.type) {
      default:
      case 'input':
      case 'textarea':
        return (
          <Field
            placeholder={f.label}
            name={name}
            component={f.type || 'input'}
          />
        );
      case 'autocomplete':
        return (
          <AutoCompleteField
            name={name}
            label={f.label}
            data={f.options || []}
            onChange={(value: string) => setFieldValue(name, value)}
          />
        );
    }
  }

  const fieldsRendered = (props: FormikHelpers<T>) =>
    Object.entries(fields).map(e => {
      const name = e[0];
      const f = e[1] as FieldI;

      const components: Record<string, FieldComponent> = {
        input: 'input',
        textarea: 'textarea',
      };

      return (
        <>
          <FormLabel>{f?.label}</FormLabel>
          {getComponent(name, f, props)}
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
        {(props: FormikHelpers<T>) => (
          <Form className="form">
            {fieldsRendered(props)}
            <Button
              type={'submit'}
              className="theme-button"
              disabled={isSubmitted}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
