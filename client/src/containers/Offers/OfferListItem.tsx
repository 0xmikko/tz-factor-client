/*
 * TZ-Factor - DeFi Factoring on Tezos
 * https://github.com/MikaelLazarev/tz-factor-client
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Bond, getBondTicker, WalletBondInfo} from '../../core/bonds';
import {numberWithCommas, toHumanDate} from '../../utils/formaters';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Offer} from '../../core/offers';
import {Loading} from '../../components/Loading';

interface OfferListItemProps {
  bond: Bond;
  item: Offer;
}

export const OfferListItem: React.FC<OfferListItemProps> = ({
  item,
  bond,
}: OfferListItemProps) => {
  const history = useHistory();

  if (!bond) {
    return <Loading />;
  }

  const onBuy = () => {
    console.log('Buy');
  };
  return (
    <tr key={item.id}>
      <td className="text-right tx-medium">{numberWithCommas(item.price)}</td>
      <td className="tx-color-03 text-right tx-medium">
        {numberWithCommas(item.amount)}
      </td>

      <td className="text-right tx-medium">{item.interest?.toFixed(2)}%</td>
      <td>
        <Button
          size="sm"
          variant="outline-primary"
          style={{marginRight: '10px'}}
          // disabled={isButtonDisabled}
          onClick={() => onBuy()}>
          {/*{ isButtonDisabled ? 'In progress' : 'Deposit'}*/}
          Buy
        </Button>
      </td>
    </tr>
  );
};
