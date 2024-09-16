import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAsyncEffect } from 'ahooks';
import localforage from 'localforage';

import useMenu from './useMenu';

import type { BreadcrumItem, MenuItem } from '@/types/custom-types';
import type { BreadcrumbProps } from 'antd/lib';
import type { TFunction } from 'i18next';

import useGlobalStore from '@/store';
import useMenuStore from '@/store/menu';

function generateBreadcrumList(
  key: string, // 通过点击的key来寻找
  menuList: MenuItem[], // 菜单列表
  t: TFunction<'translation', undefined>,
) {
  const list: BreadcrumbProps['items'] = [];
  const keyArr: string[] = key.split('/').filter((i) => i);
  const firstMenuKey = keyArr[0];
  const firstMenu = menuList.find((item) => item?.key === '/' + firstMenuKey);
  if (firstMenu) {
    formatMenu([firstMenu], list, key, t);
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
  t: TFunction<'translation', undefined>, // 翻译函数
) {
  for (let i = 0; i < menList.length; i++) {
    const menu = menList[i];
    const breadcrumbItem: BreadcrumItem = {
      title: t(`menu.${menu?.label}`),
      path: menu.key,
      icon: menu?.icon,
    };
    if (menu.children) {
      breadcrumbItem.menu = {
        items: menu.children.map((item) => ({
          label: t(`menu.${item?.label}`),
          key: item?.key,
        })),
      };
      // 这里有平级菜单需要过滤掉
      if (key.includes(menu.key)) {
        breadcrumbList.push(breadcrumbItem);
      }
      // 子菜单遍历，这里需要把子菜单提出来，面包屑不是嵌套结构
      formatMenu(menu.children, breadcrumbList, key, t);
    } else if (key.includes(menu.key)) {
      breadcrumbList.push(breadcrumbItem);
    }
  }
}

const useBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { stringIconMenuItems } = useMenu();
  const { appLanguage } = useGlobalStore();
  const [breadcrumbList, setBreadcrumbList] = useState<
    BreadcrumbProps['items']
  >([]);
  const { cachedBreadcrumbListMap } = useMenuStore();
  useAsyncEffect(async () => {
    const key = location.pathname;
    const cachedKey = `${key}::breadcrumbList`;
    const storeBreadCrumbRecord = cachedBreadcrumbListMap.get(cachedKey);
    //  一般情况下从store里面取，比从indexDB取快一些
    if (storeBreadCrumbRecord) {
      const storeCachedBreadCrumList = storeBreadCrumbRecord[appLanguage];
      if (storeCachedBreadCrumList && storeCachedBreadCrumList.length > 0) {
        setBreadcrumbList(storeCachedBreadCrumList);
        // 这里没必要存，有store必然有db缓存
        // localforage.setItem(cachedKey, {
        //   ...(dbBreadCrumbRecord || {}),
        //   [appLanguage]: storeCachedBreadCrumList,
        // });
        return;
      }
    }
    const dbBreadCrumbRecord =
      await localforage.getItem<Record<string, BreadcrumbProps['items']>>(
        cachedKey,
      );
    // // 对于直接刷新浏览器，可以从indexDB里面取，来恢复之前的面包屑
    if (dbBreadCrumbRecord) {
      const dbCachedBreadCrumbList = dbBreadCrumbRecord[appLanguage];
      if (dbCachedBreadCrumbList && dbCachedBreadCrumbList.length > 0) {
        setBreadcrumbList(dbCachedBreadCrumbList);
        cachedBreadcrumbListMap.set(cachedKey, {
          ...(storeBreadCrumbRecord || {}),
          [appLanguage]: dbCachedBreadCrumbList,
        });
        return;
      }
    }
    // 根据pathname生成面包屑
    const breadcrumbList = generateBreadcrumList(key, stringIconMenuItems, t);
    setBreadcrumbList(breadcrumbList);
    cachedBreadcrumbListMap.set(cachedKey, {
      [appLanguage]: breadcrumbList,
    });
    localforage.setItem(cachedKey, {
      ...(dbBreadCrumbRecord || {}),
      [appLanguage]: breadcrumbList,
    });
  }, [location.pathname, appLanguage, stringIconMenuItems]);
  return breadcrumbList;
};

export default useBreadcrumb;
