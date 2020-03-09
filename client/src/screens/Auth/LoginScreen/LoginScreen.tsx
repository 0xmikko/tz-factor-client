/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import actions from '../../../store/actions';
import LoginForm from '../../../containers/LoginForm/LoginForm';
import './LoginScreen.css'

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = (email: string, password: string) => {
    // updating current profile
    dispatch(actions.auth.login(email, password));
  };

  return (
    <Container className="onescreen login-screen" fluid>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <Card>
          <LoginForm onSubmit={onSubmit} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
