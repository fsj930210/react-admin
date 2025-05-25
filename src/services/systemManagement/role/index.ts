import { REACT_ADMIN_API_PREFIX_V1 } from '@/utils/constants';
import { adminApi } from '@/utils/requst';

import type { IGetRoleListParams, IGetRoleListResponse } from './interface';
import type { IBasicResponse, IPagingResponse } from '@/types/custom-types';

export function getRoleList(params: IGetRoleListParams) {
  return adminApi<
    IGetRoleListResponse,
    IPagingResponse<IGetRoleListResponse>,
    IGetRoleListParams
  >(`${REACT_ADMIN_API_PREFIX_V1}/role/list`, {
    method: 'GET',
    params,
  });
}
export function createRole() {
  return adminApi<
    IGetRoleListResponse,
    IBasicResponse<null>,
    IGetRoleListParams
  >(`${REACT_ADMIN_API_PREFIX_V1}/role/create`, {
    method: 'POST',
  });
}
export function updateRole(id: number) {
  return adminApi<
    IGetRoleListResponse,
    IBasicResponse<null>,
    IGetRoleListParams
  >(`${REACT_ADMIN_API_PREFIX_V1}/role/${id}`, {
    method: 'PUT',
  });
}
export function deleteRole(id: number) {
  return adminApi<
    IGetRoleListResponse,
    IBasicResponse<null>,
    IGetRoleListParams
  >(`${REACT_ADMIN_API_PREFIX_V1}/role/${id}`, {
    method: 'DELETE',
  });
}