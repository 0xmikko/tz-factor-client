/*
 * TZ-Factor - DeFi Factoring on Tezos
 * https://github.com/MikaelLazarev/tz-factor-client
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {getBondTicker, WalletBondInfo} from '../../core/bonds';
import {numberWithCommas, toHumanDate} from '../../utils/formaters';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router';

interface WalletBondsItemListProps {
  item: WalletBondInfo;
  onItemSelected: (id: string) => void;
}

export const WalletBondsItem: React.FC<WalletBondsItemListProps> = ({
  item,
  onItemSelected,
}: WalletBondsItemListProps) => {
  const history = useHistory();
  const onOffer = () => {
    history.push(`/bonds/${item.id}/offer/${item.account}/new`);
  };

  const actionButton =
    Date.now() < Date.parse(item.matureDate) ? (
      <Button
        size="sm"
        variant="outline-primary"
        style={{marginRight: '10px'}}
        // disabled={isButtonDisabled}
        onClick={() => onOffer()}>
        {/*{ isButtonDisabled ? 'In progress' : 'Deposit'}*/}
        Offer
      </Button>
    ) : (
      <Button
        size="sm"
        variant="outline-primary"
        // disabled={isButtonDisabled}
        // onClick={() => onButtonPressed(item.id, 'Deposit')}
      >
        {/*{ isButtonDisabled ? 'In progress' : 'Deposit'}*/}
        Execute
      </Button>
    );

  return (
    <tr key={item.id}>
      <td className="tx-color-03 tx-normal">{getBondTicker(item)}</td>
      <td className="text-right tx-medium">
        {numberWithCommas(item.valueOnAccount)}
      </td>
      <td className="text-center tx-medium">{toHumanDate(item.matureDate)}</td>

      <td className="text-center tx-medium">{item.account}</td>
      <td>{actionButton}</td>
    </tr>
  );
};
