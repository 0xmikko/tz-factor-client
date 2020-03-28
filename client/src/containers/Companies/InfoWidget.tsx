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

interface InfoWidgetProps {
  data: Company;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({data}) => {
  const fields = [
    'Type',
    'Industry',
    'Founded',
    'Headquaters',
    'Number of employees',
    'Product',
    'Revenue',
    'Website',
  ];

  const renderedFields = fields.map(a => (
    <tr key={a}>
      <td>
        <b>{a}</b>
      </td>
      <td>{a}</td>
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
