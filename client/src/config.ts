/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : window.location.protocol + "//" + window.location.host;

export const SSO_ADDR =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : window.location.protocol + "//crm." + window.location.host;

export const tezosNode = 'https://carthagenet.tezos.org.ua';
export const contractAddress = 'KT1T19rKYLJ7UoEG5paj34fYa14Y9soV1cf5';
