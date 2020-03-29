/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table, Card, Container} from 'react-bootstrap';
import {Bond, getBondTicker, WalletBondInfo} from '../../core/bonds';
import {numberWithCommas, toHumanDate} from '../../utils/formaters';
import {WalletBondsItem} from './WalletListItem';

interface BondsListProps {
  items: WalletBondInfo[];
  onItemSelected: (id: string) => void;
}

export const WalletBondsListWidget: React.FC<BondsListProps> = ({
  items,
  onItemSelected,
}: BondsListProps) => {

  const renderTableContent = items.map(h => (
    <WalletBondsItem item={h} key={h.id} onItemSelected={onItemSelected} />
  ));

  return (
    <Container className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <Card className="card-dashboard-table">
        {/*<!-- card-body -->}*/}
        <div className="table-responsive">
          <Table className="table-dashboard mg-b-0" hover={true}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th className="text-right">You own</th>
                <th className="text-center">Mature date</th>
                <th className="text-center">Account</th>
                <th className="text-right"></th>
              </tr>
            </thead>
            <tbody>{renderTableContent}</tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};
