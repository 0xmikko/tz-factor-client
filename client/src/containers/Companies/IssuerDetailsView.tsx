/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Company} from '../../core/companies';
import TabsBar from '../../components/PageHeader/TabsBar';
import {TabPane} from '../../components/PageHeader/TabPane';
import {InfoWidget} from './InfoWidget';
import {TotalBar} from '../../components/TotalBar';
import {Col, Container, Row} from 'react-bootstrap';
import {PriceChart} from '../../components/PriceChart';
import {BondsListWidget} from '../Bonds/ListWidget';
import {useHistory} from 'react-router';
import {Bond} from '../../core/bonds';

interface CompanyDetailsProps {
  data: Company;
}

export const IssuerDetailsView: React.FC<CompanyDetailsProps> = ({
  data,
}: CompanyDetailsProps) => {
  const history = useHistory();

  const onBondSelected = (id: string) => {
    history.push('/bonds/' + id);
  };

  const bonds: Bond[] = [
    {
      id: '123213',
      matureDate: new Date(),
      issuer: {
        id: '123124',
        name: 'Spar Limited Co.',
        address: '12323',
        type: 'ISSUER',
        taxId: '123',
      },
      issuedAt: new Date(),
      amount: 23.12,
    },
  ];

  return (
    <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <Row>
        <Col lg={12} md={12} xs={12}>
          <TotalBar total_amount={12000345.45} />
        </Col>
      </Row>
      <Row style={{marginTop: '20px'}}>
        <Col lg={8} md={8} xs={12}>
          <PriceChart />
        </Col>
        <Col lg={4} md={4} xs={12}>
          <BondsListWidget items={bonds} onItemSelected={onBondSelected} />
        </Col>
      </Row>
    </Container>
  );
};
