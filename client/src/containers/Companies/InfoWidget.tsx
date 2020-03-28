/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Company} from '../../core/companies';
import {BACKEND_ADDR} from '../../config';
import {Card, Table} from 'react-bootstrap';
import moment from 'moment';
import {numberWithCommas} from "../../utils/formaters";

interface InfoWidgetProps {
  data: Company;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({data}) => {
  const fields = [
    ['Type', data.orgType],
    ['Industry', data.industry],
    ['Founded', data.founder],
    ['Headquaters', data.headquaters],
    ['Number of employees', numberWithCommas(data.numberOfEmployees)],
    ['Product', data.product],
    ['Revenue', data.revenue],
    ['Website', data.website],
  ];

  const renderedFields = fields.map(a => (
    <tr key={a[0]}>
      <td>
        <b>{a[0]}</b>
      </td>
      <td>{a[1]}</td>
    </tr>
  ));

  return (
    <Card>
      <Card.Body className="pd-0">
        <h6 className="mg-b-0 pd-15-f">Company info</h6>
        <Table>{renderedFields}</Table>
      </Card.Body>
    </Card>
  );
};
