import type React from 'react';
import type { RouteObject } from 'react-router-dom';

import type { ItemType as BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

declare global {
  interface Window {
    sliderCaptcha: any;
  }
}

export interface IBasicResponse<T> {
  code: string;
  message: string;
  data: T;
  success: boolean;
}
export interface IPaginationParams {
  page?: number;
  page_size?: number;
}
export interface IPaging {
  page: number;
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

export type BreadcrumbItem = BreadcrumbItemType & {
  icon?: React.ReactNode;
  collapse?: boolean; // 是否折叠
  label?: React.ReactNode; // 面包屑显示的文本
  path?: string; // 面包屑对应的路径
  key?: React.Key; // 面包屑唯一标识
  title?: React.ReactNode; // 面包屑标题
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
