/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond} from '../../core/bonds';
import {InfoWidget} from './InfoWidget';
import {Col, Container, Row} from "react-bootstrap";
import {TotalBar} from "./TotalBar";
import {OffersWidget} from "../Offers/OffersWidget";

interface BondDetailsProps {
  data: Bond;
}

export const DetailsView: React.FC<BondDetailsProps> = ({
  data,
}: BondDetailsProps) => {
    return (
        <Container className="pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <TotalBar bond={data} />
                </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
                <Col lg={8} md={8} xs={12}>
                    <OffersWidget data={data.offers} bond={data}/>
                </Col>
                <Col lg={4} md={4} xs={12}>
                    <InfoWidget data={data} />
                </Col>
            </Row>
        </Container>
    );

};
