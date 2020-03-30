import React, {useState} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {FundraiserFormView} from '../../containers/Accounts/NewFundraiserForm';
import {FaucetAccount} from '../../core/accounts';
import {useDispatch} from "react-redux";
import actions from '../../store/actions'
import {useHistory} from "react-router";

export const NewAccountScreen: React.FC = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/wallet',
      title: 'Wallet',
    },
  ];


  const initialValues: FaucetAccount = {
    name: 'New account',
    mnemonic: '',
    secret: '',
    // pkh: '',
    password: '',
    email: '',
  };

  const onSubmit = async (values: FaucetAccount) => {
    dispatch(actions.accounts.addNewKey(values));
    history.push('/wallet/')
  };

  return (
    <div className="content content-fixed">
      <PageHeader title={'Adding new address'} breadcrumbs={breadcrumbs} />
      <FundraiserFormView
        data={initialValues}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </div>
  );
};
