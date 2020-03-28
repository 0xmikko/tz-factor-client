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
import {Col, Container, Row} from "react-bootstrap";
import {BondsListWidget} from "../Bonds/ListWidget";

interface CompanyDetailsProps {
  data: Company;
}

export const DetailsViewSupplier: React.FC<CompanyDetailsProps> = ({
  data,
}: CompanyDetailsProps) => {
  const tabs: string[] = ['Info', 'Bonds'];

    return (
        <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
            <Row style={{marginTop: '20px'}}>
                <Col lg={8} md={8} xs={12}>
                    {'About company'}
                </Col>
                <Col lg={4} md={4} xs={12}>
                    <InfoWidget data={data} />
                </Col>
            </Row>
        </Container>
    );
};
