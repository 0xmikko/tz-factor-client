/*
 * TZ-Factor - DeFi Factoring on Tezos
 * https://github.com/MikaelLazarev/tz-factor-client
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Card, Container, Table} from 'react-bootstrap';
import {Offer} from '../../core/offers';
import {OfferListItem} from "./OfferListItem";
import {Bond} from "../../core/bonds";

interface OffersWidgetProps {
  bond: Bond;
  data: Offer[];
}

export const OffersWidget: React.FC<OffersWidgetProps> = ({data, bond}) => {

  const compareFn = (a: Offer, b: Offer) => {
    if (a.price > b.price) { return 1}
    return -1;
  }
  const renderTableContent = data.sort(compareFn).map(item => <OfferListItem item={item} bond={bond} />);

  return (
    <Card className="card-crypto">
      <Card.Body className='p-0'>
        <h6 className="mg-b-0 pd-15-f">Offers</h6>
        <Card className="card-dashboard-table">
          <div className="table-responsive">
            <Table className="table-dashboard mg-b-0" hover={true}>
              <thead>
                <tr>
                  <th className="text-right">Price</th>
                  <th className="text-right">Avaiable</th>
                  <th className="text-right">Interest</th>
                  <th className="text-right"></th>
                </tr>
              </thead>
              <tbody>{renderTableContent}</tbody>
            </Table>
          </div>
        </Card>
      </Card.Body>
    </Card>
  );
};
