/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {RootState} from '../../store';
import {AccountsList} from '../../containers/Accounts/ListView';
import {ToolbarButton} from '../../containers/ToolbarButton';

export const AccountsListTab: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.accounts.getLocalAccountsList());
    dispatch(actions.accounts.connectSocket())
    dispatch(actions.accounts.getList());
  }, [dispatch]);

  const {data, status} = useSelector(
    (state: RootState) => state.accounts.LocalList,
  );
  const registeredAccounts = useSelector(
    (state: RootState) => state.accounts.List.data,
  );

  const registeredAccountsStatus = useSelector(
      (state: RootState) => state.accounts.List.status,
  );

  const onNewAccount = () => {
    history.push('/wallet/accounts/new/');
  };

  if (status === STATUS.LOADING || registeredAccountsStatus !== STATUS.SUCCESS) {
    return <Loading />;
  }
  return (
    <Container style={{padding: 0}}>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <Button size={"sm"} onClick={onNewAccount}>Create new account</Button>
          <AccountsList items={data} registeredAccounts={registeredAccounts} />
        </Col>
      </Row>
    </Container>
  );
};
