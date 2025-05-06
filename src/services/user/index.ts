import { REACT_ADMIN_API_PREFIX_V1 } from '@/utils/constants';
import { adminApi } from '@/utils/requst';

import type {
  IGetCaptchaParams,
  IGetCaptchaResponse,
  ILoginParams,
  ILoginResponse,
} from './interface';
import type { IBasicResponse } from '@/types/custom-types';

export function getCaptcha(params: IGetCaptchaParams) {
  return adminApi<
    IGetCaptchaResponse,
    IBasicResponse<IGetCaptchaResponse>,
    IGetCaptchaParams
  >(`${REACT_ADMIN_API_PREFIX_V1}/auth/captcha`, {
    method: 'GET',
    params,
  });
}
export function login(params: ILoginParams) {
  return adminApi<ILoginResponse, IBasicResponse<ILoginResponse>, ILoginParams>(
    `${REACT_ADMIN_API_PREFIX_V1}/auth/login`,
    {
      method: 'POST',
      data: params,
    },
  );
}

export function logout() {
  return adminApi<ILoginResponse, IBasicResponse<ILoginResponse>, ILoginParams>(
    `${REACT_ADMIN_API_PREFIX_V1}/auth/logout`,
    {
      method: 'POST',
    },
  );
}
