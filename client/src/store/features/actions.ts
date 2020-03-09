/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {endpoint, FEATURES_PREFIX} from './';

import {createDataLoaderListActions,} from '../dataloader/actions';
import {SSO_ADDR} from "../../config";

export const getList = createDataLoaderListActions(
  SSO_ADDR + endpoint,
  FEATURES_PREFIX,
);
