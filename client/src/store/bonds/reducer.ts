/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {createDataLoaderReducer} from "../dataloader/reducer";
import {BONDS_PREFIX} from "./";
import {Bond} from "../../core/bonds";

export default createDataLoaderReducer<Bond>(BONDS_PREFIX)
