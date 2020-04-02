/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useEffect} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import ReactGA from 'react-ga';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Profile} from '../../core/profile';
import {RootState} from '../../store';
import './JoinScreen.css'
import {useHistory} from "react-router";

const formSchema = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .min(8),

  company: yup.string(),
  job: yup.string().required(),
  industry: yup.string().required(),
});

type FormValues = yup.InferType<typeof formSchema>;

export const JoinScreen: React.FC = () => {

  const initialValues: FormValues = {
    name: '',
    password: '',
    company: '',
    job: '',
    industry: '',
  };

  const history = useHistory();

  useEffect(() => {
    ReactGA.event({
      category: 'User',
      action: 'Confirm email',
    });
    history.replace("/join")
  }, [history]);


  const dispatch = useDispatch();
  const profile: Profile = useSelector((state: RootState) => state.profile);

  console.log(profile);

  const onSubmit = (values: FormValues) => {
    // updating current profile
    const updatedProfile = {
      ...profile,
      ...values,
    };
    dispatch(actions.profile.joinProfileRequest(updatedProfile, values.password));
  };

  return (
    <Container className="join-screen onescreen" fluid>
      <Row>
        <Col>
          <h1>Welcome to TZ-factor!</h1>
          <h2>Please, finish your registration</h2>
          <Formik
            validationSchema={formSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({isSubmitting}) => (
              <Form className="singnup-form">
                <Field type="text" placeholder="Name" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={'feedback'}
                />
                <Field type="password" placeholder="Password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={'feedback'}
                />
                <Field type="text" placeholder="Company" name="company" />
                <ErrorMessage
                  name="company"
                  component="div"
                  className={'feedback'}
                />
                <Field name="job" as="select">
                  <option value="" selected disabled hidden>
                    Your role
                  </option>
                  <option>CEO/Owner/Founder</option>
                  <option>Consulting/Professional Services</option>
                  <option>Creative Services/ Design</option>
                  <option>Engineering</option>
                  <option>Finance</option>
                  <option>HR</option>
                  <option>IT</option>
                  <option>Legal</option>
                </Field>
                <ErrorMessage
                  name="job"
                  component="div"
                  className={'feedback'}
                />
                <Field name="industry" as="select">
                  <option value="" selected disabled hidden>
                    Your industry
                  </option>
                  <option>Arts and entertainment</option>
                  <option>Automotive</option>
                  <option>Beauty and fitness</option>
                  <option>Books and optionterature</option>
                  <option>Business and industrial markets</option>
                  <option>Computers and electronics</option>
                  <option>Finance</option>
                  <option>Food and drink</option>
                  <option>Games</option>
                  <option>Healthcare</option>
                  <option>Hobbies and leisure</option>
                  <option>Home and garden</option>
                  <option>Internet and telecom</option>
                  <option>Jobs and education</option>
                  <option>Law and government</option>
                  <option>News</option>
                  <option>Onoptionne communities</option>
                  <option>People and society</option>
                  <option>Pets and animals</option>
                  <option>Real estate</option>
                  <option>Reference</option>
                  <option>Science</option>
                  <option>Shopping</option>
                  <option>Sports</option>
                  <option>Travel</option>
                  <option>Other</option>
                </Field>
                <ErrorMessage
                    name="industry"
                    component="div"
                    className={'feedback'}
                />
                <Button
                  type={'submit'}
                  className="theme-button"
                  disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
