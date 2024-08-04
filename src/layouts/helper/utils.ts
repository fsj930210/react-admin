import { BreadcrumbProps } from 'antd';
import { MenuProps } from 'antd/lib';
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

import { MenuItem } from '@/types/custom-types';

export function findAncestorsMenu(
  key: string,
  menuList: MenuItem[],
  menuItemClick?: MenuProps['onClick'],
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

function formatMenu(
  menList: MenuItem[],
  breadcrumbList: BreadcrumbProps['items'] = [],
  key: string,
  menuItemClick?: MenuProps['onClick'],
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
      if (key.includes(menu.key)) {
        breadcrumbList.push(breadcrumbItem);
      }
      formatMenu(menu.children, breadcrumbList, key, menuItemClick);
    } else if (key.includes(menu.key)) {
      breadcrumbList.push(breadcrumbItem);
    }
  }
}
