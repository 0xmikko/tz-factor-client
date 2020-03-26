/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {Operation, OPERATION_PREFIX} from './';

import {createDataLoaderDetailsReducer} from '../dataloader/details';

export default createDataLoaderDetailsReducer<Operation>(OPERATION_PREFIX);
