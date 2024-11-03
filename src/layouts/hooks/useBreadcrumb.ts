import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { BreadcrumbItem, MenuItem } from '@/types/custom-types';
import type { BreadcrumbProps } from 'antd/lib';

import useGlobalStore from '@/store';
import useMenuStore from '@/store/menu';

function generateBreadcrumbList(
  key: string, // 通过点击的key来寻找
  menuList: MenuItem[], // 菜单列表
) {
  const list: BreadcrumbProps['items'] = [];
  const keyArr: string[] = key.split('/').filter((i) => i);
  const firstMenuKey = keyArr[0];
  const firstMenu = menuList.find((item) => item?.key === '/' + firstMenuKey);
  if (firstMenu) {
    formatMenu([firstMenu], list, key);
  }
  return list;
}
// 遍历菜单生成面包屑的格式
function formatMenu(
  menList: MenuItem[], // 当前点击的菜单及其子孙菜单
  breadcrumbList: BreadcrumbProps['items'] = [], // 最后需要的面包屑列表
  key: string, // 根据他来过滤平级菜单 // 翻译函数
) {
  for (let i = 0; i < menList.length; i++) {
    const menu = menList[i];
    const breadcrumbItem: BreadcrumbItem = {
      title: menu.label,
      path: menu.key,
      icon: menu?.icon,
    };
    if (menu.children) {
      breadcrumbItem.menu = {
        items: menu.children.map((item) => ({
          label: item.label,
          key: item?.key,
        })),
      };
      // 这里有平级菜单需要过滤掉
      if (key.includes(menu.key)) {
        breadcrumbList.push(breadcrumbItem);
      }
      // 子菜单遍历，这里需要把子菜单提出来，面包屑不是嵌套结构
      formatMenu(menu.children, breadcrumbList, key);
    } else if (key.includes(menu.key)) {
      breadcrumbList.push(breadcrumbItem);
    }
  }
}

const useBreadcrumb = () => {
  const location = useLocation();
  const menuItems = useMenuStore((state) => state.menuItems);
  const [breadcrumbList, setBreadcrumbList] = useState<
    BreadcrumbProps['items']
  >([]);
  const cachedBreadcrumbListMapRef = useRef<
    Map<string, Record<string, BreadcrumbProps['items']>>
  >(new Map());
  const { appLanguage } = useGlobalStore();
  useEffect(() => {
    const key = location.pathname;
    const cachedBreadCrumbRecord = cachedBreadcrumbListMapRef.current.get(key);
    //  一般情况下从store里面取，比从indexDB取快一些
    if (cachedBreadCrumbRecord) {
      const storeCachedBreadCrumbList = cachedBreadCrumbRecord[appLanguage];
      if (storeCachedBreadCrumbList && storeCachedBreadCrumbList.length > 0) {
        setBreadcrumbList(storeCachedBreadCrumbList);
        return;
      }
    }
    // 根据pathname生成面包屑
    const breadcrumbList = generateBreadcrumbList(key, menuItems);
    setBreadcrumbList(breadcrumbList);
    cachedBreadcrumbListMapRef.current.set(key, {
      [appLanguage]: breadcrumbList,
    });
  }, [location.pathname, menuItems]);
  return breadcrumbList;
};

export default useBreadcrumb;
