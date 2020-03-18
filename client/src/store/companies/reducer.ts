/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {Feature} from "../../core/features";
import {COMPANIES_PREFIX} from "./";
import {Company} from "../../core/companies";

export default createDataLoaderReducer<Company>(COMPANIES_PREFIX)
