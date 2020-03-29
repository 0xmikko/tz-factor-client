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
import {toHumanDate} from "../../utils/formaters";

const formSchema = yup.object({
  matureDate: yup.date().required(),
  amount: yup
    .number()
    .required()
    .moreThan(0),
  account: yup.number().required(),
});

interface BondFormFields {
  matureDate: string;
  amount: string;
  account: string;
}

interface BondIssueViewProps extends FormikFormViewProps<BondCreateDTO> {
  fromAccounts: AccountKey[];
}

export const BondIssueFormView: React.FC<BondIssueViewProps> = ({
  data,
  fromAccounts,
  onSubmit,
  isSubmitted,
}) => {
  const initialValues: BondFormFields = {
    matureDate: toHumanDate(data?.matureDate),
    amount: data?.amount.toString() || '0',
    account: '0',
  };

  const fields = {
    account: {
      label: 'Account',
      type: 'autocomplete',
      options: fromAccounts.map<TypeaheadOptions>((account, index) => ({
        id: index.toString(),
        value: `${account.name} (${account.id})`,
      })),
    },

    amount: {
      label: 'Amount',
    },

    matureDate: {
      label: 'Mature Date',
    },
  };

  function alignTypesAndSubmit(values: BondFormFields) {
    onSubmit({
      // Convert items from string to int & data
      amount: parseInt(values.amount),
      matureDate: Date.parse(values.matureDate).valueOf(),
      account: fromAccounts[parseInt(values.account)],
    });
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
