import type { RouteObject } from 'react-router-dom';

import type { ItemType as BreadcrumbItemType } from 'antd/lib/breadcrumb/Breadcrumb';

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
  hidden?: boolean; // 是否隐藏 是否在侧边栏展示
  openMode?: 'iframe' | 'newBrowserTab' | 'router'; // 菜单打开方式 iframe-使用iframe嵌入系统 newBrowserTab-使用新的浏览器标签打开 router-使用路由打开
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
  iconName?: string;
  hidden?: boolean;
};
export type BreadcrumbItem = BreadcrumbItemType & {
  icon?: React.ReactNode;
};
export type DropDownMapValue = {
  key: string;
  icon: JSX.Element;
  label: string;
  animateIcon?: JSX.Element;
};

export type ThemeItem = {
  label: string;
  value: string;
};
