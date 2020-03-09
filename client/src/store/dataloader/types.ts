
/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export type DataLoaderListActions<T> = {
  type: string;
  payload?: [T];
  error?: boolean;
};

export type DataLoaderDetailsActions<T> = {
  type: string;
  payload?: T;
  meta: {id: string, hash: string};
  error?: boolean;
};
