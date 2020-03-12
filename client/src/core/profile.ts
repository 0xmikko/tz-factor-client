/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export type ProfileStatus =  "SPLASH" | "AUTH_REQUIRED" | "FILLING_PROFILE" | "CHOOSING_PLAN" | "READY" | "ERROR";
export type Role = "ISSUER" | "SUPPLIER" | "INVESTOR";

export interface Profile {
    id?: string,
    status: ProfileStatus,
    email: string,
    name: string,
    company? : string,
    job: string,
    industry: string,
    plan?: string,
    avatarURL?: string,
    role?: Role,
}

export const APP_STATUS_SPLASH = "SPLASH";
export const APP_STATUS_AUTH_REQUIRED = "AUTH_REQUIRED";
export const APP_STATUS_FILLING_PROFILE = "FILLING_PROFILE";
export const APP_STATUS_CHOOSING_PLAN = "CHOOSING_PLAN";
export const APP_STATUS_READY= "READY";
export const APP_STATUS_ERROR = "ERROR";


