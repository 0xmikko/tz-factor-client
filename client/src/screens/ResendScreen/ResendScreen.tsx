/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useState} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import Media from 'react-media';
import {useDispatch} from 'react-redux';
import {SelectBlock, SelectItem} from '../../containers/Select/Select';
import Image from './people.png';
import './ResendScreen.css';
import logo from './logo.png';
import robot from './robot.png';

export const ResendScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    // updating currrent profile
    // dispatch(actions.profile.joinProfileRequest());
  };

  const p1questions: SelectItem[] = [
    {
      property: "retailer",
      title: 'I\'m interested to issue obligations to pay suppliers',
    },
    {
      property: 'problem_planning',
      title: 'I\'m interested reducing days debtors using bonds',
    },
    {
      property: 'problem_recording',
      title: 'I\'m interested to invest money for factoring',
    },
  ];

  const p2questions: SelectItem[] = [
    {
      property: 'interest_0_2',
      title: '< 2%',
    },
    {
      property: 'interest_2_4',
      title: '2-4%',
    },
    {
      property: 'interest_4_6',
      title: '4-6%',
    },
    {
      property: '6+',
      title: '6%+',
    },
  ];

  const p3questions: SelectItem[] = [
    {
      property: 'tezos_yes',
      title: 'Yes',
    },
    {
      property: 'tezos_no',
      title: 'No',
    },
  ];

  const resendCard = submitted ? (
    <Col lg={6} md={0} xs={0}>
      <Card>
        <div style={{display: 'flex', flexDirection: 'column'}} className={'thanks-block'}>
          <h2 style={{marginTop: '10%'}}>Thanks for helping us to deliver the best product</h2>
<br/>
          <img
            src={robot}
            height={'100%'}
            width={'auto'}
            style={{margin: 'auto', maxHeight: '200px'}}
          /><br/>
          <br/>
          Don't forget to check your email to confirm your registration.<br/><br/>
        </div>
      </Card>
    </Col>
  ) : (
    <Col lg={6} md={0} xs={0}>
      <Card>
        <h2>Help us to deliver the best value for you</h2>
        <h4>1. What is your role?</h4>
        <SelectBlock items={p1questions} allowMany={true} />
        <h4>2. What is applicable interest rate for your purposes?</h4>
        <SelectBlock items={p2questions} allowMany={false} />

        <h4>3. Do you know how tezos blockchain proofs your oprerations?</h4>
        <SelectBlock items={p3questions} allowMany={true} />
        <br />
        <br />
        <Button variant={'primary'} onClick={() => setSubmitted(true)}>Submit</Button>
      </Card>
    </Col>
  );

  const emailCol = (
    <Col lg={6} md={12} xs={12} style={{paddingLeft: '5%', paddingRight: '5%'}}>
      <img src={logo} height={'50px'} />
      <h1>Thank you for choosing TZ-Factor!</h1>
      <p className={'notice'}>
        We’ve sent you a letter with activation link to your email address.{' '}
        <br />
        <br />
        Please check your inbox and follow the link to complete your
        registration.
        <br />
        <br />
        If you have any questions, please{' '}
        <a href={'mailto:hello@willie.ai'}>contact us.</a>
        {/*Do not see email in your box?*/}
      </p>
      <img src={Image} width={'100%'} />
      {/*<Button>Resend email</Button>*/}
    </Col>
  );

  return (
    <Container className="resend-screen onescreen" fluid>
      <Row>
        <Media queries={{small: '(max-width: 992px)'}}>
          {matches =>
            matches.small ? (
              <>
                {' '}
                {emailCol} {resendCard}
              </>
            ) : (
              <>
                {resendCard}
                {emailCol}
              </>
            )
          }
        </Media>
      </Row>
    </Container>
  );
};
