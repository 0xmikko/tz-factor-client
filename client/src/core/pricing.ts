/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export interface PricingPlan {
    plan: 'basic_plan' | 'premium_plan' | 'teams_plan';
    title: string
    bestValue: boolean
    price: number

}
