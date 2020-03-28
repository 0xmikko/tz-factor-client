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
import {Button, ButtonGroup, Card, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {CompaniesList} from '../../containers/Companies/ListView';
import {RootState} from "../../store";
import {Company} from "../../core/companies";

export const CompaniesListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.companies.connectSocket());
    dispatch(actions.companies.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.companies.List);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/companies',
      title: 'Companies',
    },
  ];

  const onPay = () => {
    history.push('/payments/new/edit/');
  };
  const hash = history.location.hash;

  const rightToolbar = (
        <ButtonGroup className="flex-fill m-0" >
          <Button variant={'outline-primary'} size={'sm'} active={hash === ''} onClick={() => onFilter("")}>All</Button>
          <Button variant={'outline-primary'} size={'sm'} active={hash === '#issuers'} onClick={() => onFilter("issuers")}>Issuers</Button>
          <Button variant={'outline-primary'} size={'sm'} active={hash === '#suppliers'} onClick={() => onFilter("suppliers")}>Suppliers</Button>
        </ButtonGroup>
  );

  const onItemSelected = (id: string) => history.push(`/companies/${id}`);
  const onFilter = (filter: string) => {
    history.push('/companies#' + filter);
  };



  let filteredData : Company[];
  switch (hash) {
    default:
      filteredData = data;
      break;
    case '#issuers':
      filteredData = data?.filter(c => (c?.type === 'ISSUER'))
          break;
    case '#suppliers':
      filteredData = data?.filter(c => (c?.type !== 'ISSUER'))
      break;

  }

  return (
    <div className="content content-fixed">
      <PageHeader
        title={'Companies'}
        breadcrumbs={breadcrumbs}
        rightPanel={rightToolbar}
      />
      {status === STATUS.SUCCESS ? (
        <Container style={{padding: 0}}>
          <Row>
            <Col lg={12} md={12} xs={12}>
              <CompaniesList items={filteredData} onItemSelected={onItemSelected} />
            </Col>
          </Row>
        </Container>
      ) : (
        //       <Card.Body>
        //         className={'pd-y-30 pd-x-0'}
        //         style={{paddingLeft: 0, paddingRight: 0}}>
        //         <CompaniesList items={data} onItemSelected={onItemSelected} />
        //       </Card.Body>
        //     </Card>
        //   </div>
        // </div>
        <Loading />
      )}
    </div>
  );
};
