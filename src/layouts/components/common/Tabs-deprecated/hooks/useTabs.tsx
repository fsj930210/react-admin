import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import RaIcon from '@/components/RaIcon';
import type { Tab } from '@/components/RaTabs-deprecated/interface';

import { HOME_PATH, RA_CACHED_TABS_KEY } from '@/utils/constants';
import storage from '@/utils/storage';

import type { MenuItem } from '@/types/menu';

import useSiderStoreSelector from '@/store/menu';
import useTabsStoreSelector from '@/store/tabs';

export type UpdateTabFunc = (tabItems: Tab[]) => Tab[];
export type UpdateTabItems = (updateFunc: UpdateTabFunc) => void;

export function useTabs() {
  const location = useLocation();
  const { setActiveKey, setTabItems } = useTabsStoreSelector([
    'setActiveKey',
    'setTabItems',
    'tabItems',
  ]);
  const { flatMenuItems } = useSiderStoreSelector(['flatMenuItems']);
  const tabItemsRef = useRef<Tab[]>([]);

  /**
   * 根据菜单项创建标签页
   */
  const createTabFromMenuItem = (menuItem: MenuItem): Tab => {
    return {
      key: menuItem.key,
      label: menuItem.label,
      icon: <RaIcon icon={menuItem.iconify_name as string} />,
      closable: menuItem.key !== HOME_PATH,
      pin: menuItem.key === HOME_PATH,
      disabled: false,
      children: null,
      title: menuItem.title, // 主要用于国际化
      'data-icon': menuItem.iconify_name,
    };
  };

  /**
   * 缓存标签页
   */
  const cacheTabItems = (items: Tab[]) => {
    const itemsToCache = items.map((item) => ({
      ...item,
      icon: item['data-icon'], // 只缓存图标名称
    }));
    storage.setItem(RA_CACHED_TABS_KEY, itemsToCache);
  };

  /**
   * 恢复缓存的标签页
   */
  const restoreCachedTabs = () => {
    const cachedItems = storage.getItem<Tab[]>(RA_CACHED_TABS_KEY);
    if (cachedItems?.length) {
      tabItemsRef.current = cachedItems.map((tab) => ({
        ...tab,
        label: tab.label,
        icon: <RaIcon icon={tab['data-icon'] as string} />,
      }));
      setTabItems(tabItemsRef.current);
    }
  };

  /**
   * 确保首页标签存在
   */
  const ensureHomeTab = (currentItems: Tab[]) => {
    const homeMenuItem = flatMenuItems[HOME_PATH];
    if (!homeMenuItem) return currentItems;

    const homeTab = currentItems.find((item) => item.key === HOME_PATH);
    if (!homeTab) {
      currentItems.unshift(createTabFromMenuItem(homeMenuItem));
    }
    return currentItems;
  };

  /**
   * 更新标签页
   */
  const updateTabItems = (updateFunc: UpdateTabFunc) => {
    const newTabItems = updateFunc(tabItemsRef.current);
    tabItemsRef.current = newTabItems;
    cacheTabItems(newTabItems);
    setTabItems(newTabItems);
  };
  // 初始化：恢复缓存的标签页，注意useEffect顺序
  useEffect(() => {
    restoreCachedTabs();
  }, []);

  /**
   * 处理路由变化和菜单项更新
   */
  useEffect(() => {
    const currentPath = location.pathname;
    const menuItem = flatMenuItems[currentPath];

    // 更新所有已存在的标签页
    const updatedItems = tabItemsRef.current.map((tab) => {
      const matchedMenuItem = flatMenuItems[tab.key];
      if (matchedMenuItem) {
        return {
          ...tab,
          label: matchedMenuItem.label,
          title: matchedMenuItem.title,
          icon: <RaIcon icon={matchedMenuItem.iconify_name as string} />,
          'data-icon': matchedMenuItem.iconify_name,
        };
      }
      return tab;
    });

    // 处理当前路径对应的标签页
    if (menuItem) {
      const existingTab = updatedItems.find((tab) => tab.key === currentPath);

      if (!existingTab) {
        // 添加新标签
        updatedItems.push(createTabFromMenuItem(menuItem));
      }
    }

    const processedItems = ensureHomeTab(updatedItems);
    tabItemsRef.current = processedItems;
    setTabItems(processedItems);
    setActiveKey(currentPath);
    cacheTabItems(processedItems);
  }, [location.pathname, flatMenuItems]);

  return {
    updateTabItems,
  };
}

export default useTabs;
