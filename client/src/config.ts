/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'localhost:4000'
    : 'https://tz-factor-server-stage.herokuapp.com'

export const SSO_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'https://crm.tz-factor.com'
    : window.location.protocol + '//crm.' + window.location.host;

export const tezosNode = 'https://carthagenet.tezos.org.ua';
export const contractAddress = 'KT1PPZB5A7w4s3vACgh7iwwgTBJiNBM787Ud';
