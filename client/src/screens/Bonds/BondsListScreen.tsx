/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {BondsList} from '../../containers/Bonds/ListView';
import {RootState} from '../../store';
import {ToolbarButton} from '../../containers/ToolbarButton';

export const BondsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.bonds.connectSocket());
    dispatch(actions.bonds.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.bonds.List);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/bonds',
      title: 'Bonds',
    },
  ];

  const onIssue = () => {
    history.push('/bonds/new');
  };

  const rightToolbar = <ToolbarButton title={'ISSUE'} onClick={onIssue} />;

  const onItemSelected = (id: string) => history.push(`/bonds/${id}`);
  const onFilter = (filter: string) => {
    history.push('/bonds#' + filter);
  };

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Bonds'}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      {status === STATUS.SUCCESS ? (
        <Container style={{padding: 0}}>
          <Row>
            <Col lg={12} md={12} xs={12}>
              <BondsList items={data} onItemSelected={onItemSelected} />
            </Col>
          </Row>
        </Container>
      ) : (
        //       <Card.Body>
        //         className={'pd-y-30 pd-x-0'}
        //         style={{paddingLeft: 0, paddingRight: 0}}>
        //         <BondsList items={data} onItemSelected={onItemSelected} />
        //       </Card.Body>
        //     </Card>
        //   </div>
        // </div>
        <Loading />
      )}
    </div>
  );
};
