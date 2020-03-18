/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Link} from "react-router-dom";

export interface Breadcrumb {
  url: string;
  title: string;
}

export interface BreadcrumbProps {
  items: Breadcrumb[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
}: BreadcrumbProps) => {
  const renderedItems = items.map(e => (
    <li className="breadcrumb-item" key={e.url+e.title}>
      <Link to={e.url}>{e.title}</Link>
    </li>
  ));

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb-style1 mg-b-10">{renderedItems}</ol>
    </nav>
  );
};
