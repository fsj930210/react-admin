import type { IPaginationParams } from "@/types/custom-types";

export enum RoleStatus {
  Enable = 1,
  Disable = 2,
}
export interface IGetRoleListParams extends IPaginationParams {
  status?: RoleStatus;
  role_name?: string;
}

export interface IGetRoleListResponse {
  role_name: string;
  id: number;
  role_code: string;
  status: RoleStatus;
  remark: string;
}