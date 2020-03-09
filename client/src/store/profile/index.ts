/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import {Profile, ProfileStatus} from '../../core/profile';

export const endpoint = '/api/profile/';

export type ProfileActions =
  | {
      type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE';
      payload?: Profile;
      error?: boolean;
    }
  | {type: 'PROFILE_UPDATE_STATUS'; status: ProfileStatus};
