/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
// import ComponentSearch from './ComponentSearch';
import {Breadcrumb} from './Breadcrumb';
import Helmet from "react-helmet";

interface PageHeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  rightPanel?: React.ReactElement<any, string>
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  rightPanel,
}: PageHeaderProps) => {
  return (
    <>
      <Helmet title={title} />
      <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div>
            <Breadcrumb items={breadcrumbs} />
            <h4 className="mg-b-0">{title}</h4>
          </div>
          <div className="d-sm-flex align-items-center justify-content-between">
          {rightPanel}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
