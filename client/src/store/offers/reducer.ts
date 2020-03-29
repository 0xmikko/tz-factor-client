/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {OFFERS_PREFIX} from "./";
import {Offer} from "../../core/offers";

export default createDataLoaderReducer<Offer>(OFFERS_PREFIX)
