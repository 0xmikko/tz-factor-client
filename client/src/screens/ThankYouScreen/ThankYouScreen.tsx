/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import io from 'socket.io-client'
import Robot from './robot.png';
import ReactGA from 'react-ga';
import './ThankYouScreen.css'
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import actions from "../../store/actions";
import {BACKEND_ADDR} from "../../config";

export const ThankYouScreen: React.FC = () => {

  const history = useHistory();

  useEffect(() => {
    console.log("Registered");
    ReactGA.event({
      category: 'User',
      action: 'Registered!',
    });
    history.replace("/thanks")
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Open TYS")

    return () => {
      // socket.disconnect();
    };
  }, []);


  const onClick = () => {
    // dispatch(actions.events.sendEvent("interview"));
  };

  return (
    <Container className="onescreen thanks-screen" fluid>
      <Card>
        <p>
          <img src={Robot} width={140} style={{marginLeft: '30px'}} />
        </p>
        <h1 style={{marginTop: '0px'}}>Thank you for joining us!</h1>

        <p style={{fontSize: '20px', marginTop: '20px'}}>
          Willie is in development now, we'll inform you about it's release.
          <br />
          <br /> We are glad to see in early adopters, your opinion is very valuable for us. We offer you $20 Willie promocode for 30-min interview. <br/><br/>
          <Button onClick={onClick}>Arrange for an interview</Button><br/><br/>
          Help us to make amazing product.
        </p>
      </Card>
    </Container>
  );
};
