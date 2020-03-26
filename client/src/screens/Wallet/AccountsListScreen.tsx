/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {PaymentsList} from '../../containers/Payments/ListView';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {CompaniesList} from '../../containers/Companies/ListView';
import {RootState} from '../../store';
import {AccountsList} from '../../containers/Accounts/ListView';
import {ToolbarButton} from '../../containers/ToolbarButton';

export const AccountsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.accounts.getLocalAccountsList());
    dispatch(actions.accounts.getList());
  }, [dispatch]);

  const {data, status} = useSelector(
    (state: RootState) => state.accounts.LocalList,
  );
  const registeredAccounts = useSelector(
    (state: RootState) => state.accounts.List.data,
  );

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/wallet',
      title: 'Wallet',
    },
    {
      url: '/wallet/accounts',
      title: 'Accounts',
    },
  ];

  const onNewAccount = () => {
    history.push('/wallet/accounts/new/');
  };

  const rightToolbar = (
    <>
      <ToolbarButton title={'Create'} onClick={onNewAccount} />
    </>
  );


  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Accounts'}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      {status === STATUS.SUCCESS ? (
        <Container style={{padding: 0}}>
          <Row>
            <Col lg={12} md={12} xs={12}>
              <AccountsList
                items={data}
                registeredAccounts={registeredAccounts}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};
