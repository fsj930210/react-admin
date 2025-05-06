import type { ReactNode } from 'react';

import type { MenuItemType } from 'antd/lib/menu/interface';

// 菜单项基础接口
export interface BaseMenuItem extends MenuItemType {
  key: string; // 菜单唯一标识
  label: string; // 显示的菜单名称
  title: string; // 原始标题，用于国际化
  icon?: React.ReactNode; // 菜单图标
  path?: string; // 菜单路径
  hidden?: boolean; // 是否隐藏菜单
  children?: MenuItem[]; // 子菜单
  order?: number; // 排序权重
  openMode?: 'iframe' | 'newBrowserTab' | 'router'; // 打开方式
  ['data-icon']?: string;
}

// 前端路由菜单项
export interface RouteMenuItem extends BaseMenuItem {
  component?: ReactNode; // 路由组件
}

// 后端接口菜单项
export interface ApiMenuItem extends BaseMenuItem {
  id: string; // 后端菜单ID
  parentId?: string; // 父菜单ID
  permission?: string; // 权限标识
}

// 统一菜单项类型
export type MenuItem = RouteMenuItem | ApiMenuItem;

// 菜单服务配置选项
export interface MenuServiceOptions {
  defaultIcon?: string; // 默认图标
  defaultOpenMode?: 'iframe' | 'newBrowserTab' | 'router';
  i18nPrefix?: string; // 国际化前缀
}
