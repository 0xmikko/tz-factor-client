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
import {SelectBlock, SelectItem} from '../../../containers/Select/Select';
import Image from './people.png';
import './ResendScreen.css';
import logo from '../../../logo.png';
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
      property: 'problem_timesaving',
      title: 'Time savings',
    },
    {
      property: 'problem_planning',
      title: 'Better meeting planning',
    },
    {
      property: 'problem_recording',
      title: 'Voice recording',
    },
    {
      property: 'problem_actionplan',
      title: 'Clear action plan',
    },
  ];

  const p2questions: SelectItem[] = [
    {
      property: 'meetings_0_3',
      title: 'Less 3',
    },
    {
      property: 'meetings_3_5',
      title: '3-5',
    },
    {
      property: 'meetings_5_15',
      title: '5-15',
    },
    {
      property: 'meetings_15+',
      title: '15+',
    },
  ];

  const p3questions: SelectItem[] = [
    {
      property: 'tool_outlook',
      title: 'MS Outlook',
    },
    {
      property: 'tool_gcalendar',
      title: 'Google Calendar',
    },
    {
      property: 'tool_calendly',
      title: 'Calendly',
    },
    {
      property: 'tool_doodle',
      title: 'Doodle',
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
        <h4>1. How many meetings do you have a week?</h4>
        <SelectBlock items={p1questions} allowMany={true} />
        <h4>2. How many meetings you have a week?</h4>
        <SelectBlock items={p2questions} allowMany={false} />

        <h4>3. Which tools do you use for organising meetings?</h4>
        <SelectBlock items={p3questions} allowMany={true} />
        <br />
        <br />
        <Button variant={'primary'} onClick={() => setSubmitted(true)}>Submit</Button>
      </Card>
    </Col>
  );

  const emailCol = (
    <Col lg={6} md={12} xs={12} style={{paddingLeft: '5%', paddingRight: '5%'}}>
      <img src={logo} height={'80px'} />
      <h1>Thank you for choosing Willie!</h1>
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
