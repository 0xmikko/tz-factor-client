/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond} from '../../core/bonds';
import {BACKEND_ADDR} from "../../config";
import moment from 'moment';
import {Card, Table} from "react-bootstrap";
import {numberWithCommas, toHumanDate} from "../../utils/formaters";

interface InfoWidgetProps {
  data: Bond;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({data}) => {
    return (
        <Card>
            <Card.Header className="card-header">
                <h6 className="mg-b-0">Info</h6>
            </Card.Header>
            <Card.Body className="pd-20">
                <div className="table-responsive">
                    Issuer: <a href={`/company/${data.issuer.id}`}>{data.issuer.name}</a> <br/>
                    Mature Date: {toHumanDate(data.matureDate)} <br/>
                    Total amount: {numberWithCommas(data.total)} <br/>
                </div>
            </Card.Body>
        </Card>
    );

};
