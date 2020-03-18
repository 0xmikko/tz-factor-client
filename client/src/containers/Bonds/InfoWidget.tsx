/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond} from '../../core/bonds';
import {BACKEND_ADDR} from "../../config";

interface InfoWidgetProps {
  data: Bond;
}

export const InfoWidget: React.FC<InfoWidgetProps> = ({data}) => {
  return <>
      URL: <a href={`${BACKEND_ADDR}/pr/${data.issuer}`}>/{data.matureDate}</a> <br/>
        <br/>
      {/* Oneliner: {data.one_liner} <br/>
      Description: {data.description} <br/>
      Title: {data.title}<br/>
      Meta keywords: {data.meta_keywords} <br/>
      Meta description: {data.meta_description}<br/> */}

      {/*Total clicks: {data.total_clicks} <br/>*/}

  </>;
};
