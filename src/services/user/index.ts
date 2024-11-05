import axios from '@/utils/axios';

import type { ILoginParams, ILoginResponse } from './interface';
import type { IBasicResponse } from '@/types/custom-types';

export function login(params: ILoginParams) {
  return axios<ILoginResponse, IBasicResponse<ILoginResponse>, ILoginParams>(
    '/login',
    {
      method: 'POST',
      data: params,
    },
  );
}
