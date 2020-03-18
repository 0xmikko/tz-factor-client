/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Company} from '../../core/companies';
import {BACKEND_ADDR} from "../../config";

interface InfoWidgetProps {
  data: Company;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({data}) => {
  return <>
      {/* URL: <a href={`${BACKEND_ADDR}/pr/${data.url}`}>/{data.url}</a> <br/>
        <br/>
      Oneliner: {data.one_liner} <br/>
      Description: {data.description} <br/>
      Title: {data.title}<br/>
      Meta keywords: {data.meta_keywords} <br/>
      Meta description: {data.meta_description}<br/> */}

      {/*Total clicks: {data.total_clicks} <br/>*/}

  </>;
};
