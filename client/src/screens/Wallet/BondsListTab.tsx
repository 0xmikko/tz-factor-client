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
import {BondsList} from "../../containers/Bonds/ListView";

export const BondsListTab: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.bonds.getList());
  }, [dispatch]);

  const {data, status} = useSelector(
    (state: RootState) => state.bonds.List,
  );

  const onItemSelected = (id: string) => history.push(`/bonds/${id}`);

  const onNewAccount = () => {
    history.push('/bonds/new/');
  };

  if (status === STATUS.LOADING) {
    return <Loading />;
  }
  return (
    <Container style={{padding: 0}}>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <Button size={"sm"}>Issue new bond</Button>
          <BondsList items={data} onItemSelected={onItemSelected} />
        </Col>
      </Row>
    </Container>
  );
};
