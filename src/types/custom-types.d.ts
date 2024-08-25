import { RouteObject } from 'react-router-dom';

declare global {
  interface Window {
    sliderCaptcha: any;
  }
}

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
  auth?: boolean; // 是否需要权限
  title?: string; // 菜单名
  key?: string; // 可不用，后面实际是代码生成key，因为填的key不可控
  menu?: boolean; // 是否是菜单，不是菜单的会被过滤掉
  icon?: string; // 菜单icon
  order?: number; // 菜单排序 值越小越排在前面
}

export type IRouteObject = RouteObject & {
  meta?: IRouteObjectMeta;
  children?: (RouteObject & IRouteObjectMeta)[]; // 重写children
};
export type MenuItem = {
  label: string;
  key: string;
  children?: MenuItem[];
  icon?: React.ReactNode;
  title?: string;
};
