import { RouteObject } from 'react-router-dom';

import type { MenuProps } from 'antd';
export interface IBasicResponse<T> {
  error_code: string;
  message: string;
  data: T;
  success: boolean;
}

export interface IPaging {
  page_no: number;
  page_size: number;
  total: number;
}
export interface IPagingResponse<T> extends IBasicResponse<T> {
  data: {
    paging: IPaging;
    data: T[];
  };
}

export interface IRouteObjectMeta {
  auth?: boolean;
  title?: string;
  key?: string;
  menu?: boolean;
  icon?: React.ReactNode;
}

export type IRouteObject = RouteObject & {
  meta?: IRouteObjectMeta;
  children?: (RouteObject & IRouteObjectMeta)[];
};
export type MenuItem = Required<MenuProps>['items'][number];
