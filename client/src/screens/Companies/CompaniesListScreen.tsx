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
import {RootState} from "../../store";

export const CompaniesListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.companies.connectSocket());
    dispatch(actions.companies.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.companies.List);
  // const data: Company[] = [
  //   {
  //     id: '123124',
  //     name: 'Spar',
  //     address: '12323',
  //     type: 'ISSUER',
  //     taxId: '123',
  //   },
  //   {
  //     id: '124124214',
  //     name: 'Milk Austria',
  //     address: '12323',
  //     type: 'ISSUER',
  //     taxId: '123',
  //   },
  //   {
  //     id: '123124',
  //     name: 'Spar',
  //     address: '12323',
  //     type: 'ISSUER',
  //     taxId: '123',
  //   },
  // ];

  // const status: STATUS = STATUS.SUCCESS;

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/companies',
      title: 'Companies',
    },
  ];

  const onPay = () => {
    history.push('/payments/new/edit/');
    // dispatch(actions.reload());
  };

  const rightToolbar = (
    <>
      <div>
        <div className="btn-group flex-fill">
          <button className="btn btn-white btn-xs active" onClick={() => onFilter("")}>All</button>
          <button className="btn btn-white btn-xs" onClick={() => onFilter("issuers")}>Issuers</button>
          <button className="btn btn-white btn-xs" onClick={() => onFilter("suppliers")}>Suppliers</button>
        </div>
      </div>
    </>
  );

  const onItemSelected = (id: string) => history.push(`/companies/${id}`);
  const onFilter = (filter: string) => {
    history.push('/companies#' + filter);
  };

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
              <CompaniesList items={data} onItemSelected={onItemSelected} />
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
