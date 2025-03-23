import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH, RA_CACHED_TABS_KEY } from '@/utils/constants';
import storage from '@/utils/storage';

import type { IRouteObject } from '@/types/custom-types';

import useGlobalStoreSelector from '@/store/global';
import useRouteStoreSelector from '@/store/route';
import useTabsStoreSelector from '@/store/tabs';

export function useTabs() {
  const { t } = useTranslation();
  const location = useLocation();
  const { setActiveKey, setTabItems } = useTabsStoreSelector([
    'setActiveKey',
    'setTabItems',
  ]);
  const { flatRoutes } = useRouteStoreSelector('flatRoutes');
  const { appLanguage } = useGlobalStoreSelector(['appLanguage']);
  const tabItemsRef = useRef<Tab[]>([]);

  /**
   * 根据路由创建标签页
   */
  const createTabFromRoute = useCallback((route: IRouteObject): Tab => {
    return {
      key: route.path as string,
      label: t(`menu.${route.meta?.title}`),
      icon: route.meta?.icon,
      closable: route.path !== HOME_PATH,
      pin: route.path === HOME_PATH,
      disabled: false,
      children: null,
      title: route.meta?.title, // 主要用于国际化
      'data-icon': route.meta?.icon,
    };
  }, []);

  /**
   * 缓存标签页
   */
  const cacheTabItems = useCallback((items: Tab[]) => {
    const itemsToCache = items.map((item) => ({
      ...item,
      icon: item['data-icon'], // 只缓存图标名称
    }));
    storage.setItem(RA_CACHED_TABS_KEY, itemsToCache);
  }, []);

  /**
   * 恢复缓存的标签页
   */
  const restoreCachedTabs = useCallback(() => {
    const cachedItems = storage.getItem<Tab[]>(RA_CACHED_TABS_KEY);
    if (cachedItems?.length) {
      tabItemsRef.current = cachedItems.map((tab) => ({
        ...tab,
        label: t(`menu.${tab.title}`),
        icon: tab['data-icon'],
      }));
      setTabItems(tabItemsRef.current);
    }
  }, [appLanguage]);

  /**
   * 确保首页标签存在
   */
  const ensureHomeTab = useCallback(
    (currentItems: Tab[]) => {
      const homeRoute = flatRoutes.find((r) => r.path === HOME_PATH);
      if (!homeRoute) return currentItems;

      const homeTab = currentItems.find((item) => item.key === HOME_PATH);
      if (!homeTab && homeRoute.meta?.menu) {
        currentItems.unshift(createTabFromRoute(homeRoute));
      }
      return currentItems;
    },
    [flatRoutes],
  );
  /**
   * 更新标签页
   */
  const updateTabItems = useCallback((updateFunc: () => Tab[]) => {
    const newTabItems = updateFunc();
    tabItemsRef.current = newTabItems;
    cacheTabItems(newTabItems);
    setTabItems(newTabItems);
  }, []);

  /**
   * 处理路由变化
   */
  useEffect(() => {
    const currentPath = location.pathname;
    const route = flatRoutes.find((r) => r.path === currentPath);
    if (!route?.meta?.menu) return;

    const existingTab = tabItemsRef.current.find(
      (tab) => tab.key === currentPath,
    );
    const newTabItems = [...tabItemsRef.current];
    if (!existingTab) {
      // 添加新标签
      newTabItems.push(createTabFromRoute(route));
    }

    const processedItems = ensureHomeTab(newTabItems);
    tabItemsRef.current = processedItems;
    setTabItems(processedItems);
    setActiveKey(currentPath);
    cacheTabItems(processedItems);
  }, [location.pathname, flatRoutes]);

  useEffect(() => {
    const items = [...tabItemsRef.current];
    const newItems = items.map((item) => ({
      ...item,
      label: t(`menu.${item.title}`),
    }));
    tabItemsRef.current = newItems;
    setTabItems(newItems);
  }, [appLanguage]);
  // 初始化：恢复缓存的标签页
  useEffect(() => {
    restoreCachedTabs();
  }, []);

  return {
    updateTabItems,
  };
}

export default useTabs;
