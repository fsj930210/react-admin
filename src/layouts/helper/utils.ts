import { BreadcrumbProps } from 'antd';
import { MenuProps } from 'antd/lib';
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

import { MenuItem } from '@/types/custom-types';
export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
export function generateBreadcrumList(
  key: string, // 通过点击的key来寻找
  menuList: MenuItem[], // 菜单列表
  menuItemClick?: MenuProps['onClick'], // 面包屑中菜单点击回调
) {
  const list: BreadcrumbProps['items'] = [];
  const keyArr: string[] = key.split('/').filter((i) => i);
  const firstMenuKey = keyArr[0];
  const firstMenu = menuList.find((item) => item?.key === '/' + firstMenuKey);
  if (firstMenu) {
    formatMenu([firstMenu], list, key, menuItemClick);
  } else {
    console.error('找不到此菜单');
  }
  return list;
}
// 遍历菜单生成面包屑的格式
function formatMenu(
  menList: MenuItem[], // 当前点击的菜单及其子孙菜单
  breadcrumbList: BreadcrumbProps['items'] = [], // 最后需要的面包屑列表
  key: string, // 根据他来过滤平级菜单
  menuItemClick?: MenuProps['onClick'], // 上面透传下来的面包屑菜单里面菜单
) {
  for (let i = 0; i < menList.length; i++) {
    const menu = menList[i];
    const breadcrumbItem: ItemType = {
      title: menu?.label,
      path: menu.key,
    };
    if (menu.children) {
      breadcrumbItem.menu = {
        items: menu.children.map((item) => ({
          label: item?.label,
          key: item?.key,
        })),
        onClick: menuItemClick,
      };
      // 这里有平级菜单需要过滤掉
      if (key.includes(menu.key)) {
        breadcrumbList.push(breadcrumbItem);
      }
      // 子菜单遍历，这里需要把子菜单提出来，面包屑不是嵌套结构
      formatMenu(menu.children, breadcrumbList, key, menuItemClick);
    } else if (key.includes(menu.key)) {
      breadcrumbList.push(breadcrumbItem);
    }
  }
}

export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
