/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {PAYMENTS_PREFIX} from "./";
import { Payment } from '../../core/payments';

export default createDataLoaderReducer<Payment>(PAYMENTS_PREFIX)
