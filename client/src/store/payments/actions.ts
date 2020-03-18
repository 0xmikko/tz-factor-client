/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {endpoint, PAYMENTS_PREFIX} from './';

import {createDataLoaderListActions,} from '../dataloader/actions';
import {SSO_ADDR} from "../../config";

export const getList = createDataLoaderListActions(
  SSO_ADDR + endpoint,
  PAYMENTS_PREFIX,
);
