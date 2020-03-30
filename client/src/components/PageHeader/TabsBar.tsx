/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {useHistory} from 'react-router';

interface TabsBarProps {
  tabs: string[];
  selected: string;
}

export const TabsBar: React.FC<TabsBarProps> = ({tabs}: TabsBarProps) => {
  const history = useHistory();

  const titleToHash = (t:string) => '#' + t.replace(' ', '_').toLowerCase();
  const hash = history.location.hash;
  if (!hash) {
    history.replace(titleToHash(tabs[0]))
  }


  const tabsRendered = tabs.map(title => {
    const itemHash = titleToHash(title);
    const active = (itemHash === hash) ? 'active' : '';
    return (
      <a
        href={itemHash}
        className={'nav-link ' + active}
        key={itemHash}>
        {title}

      </a>
    );
  });
  return (
    <div className="nav-wrapper mg-b-20 tx-13">
      <div>
        <nav className="nav nav-line tx-medium">{tabsRendered}</nav>
      </div>
    </div>
  );
};

export default TabsBar;
