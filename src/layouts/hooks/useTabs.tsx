import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useShallow } from 'zustand/react/shallow';

import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH, RA_CACHED_TABS_KEY } from '@/utils/constants';
import storage from '@/utils/storage';

import useMenuStore from '@/store/menu';
import useTabsStore from '@/store/tabs';

export type UpdateTabItems = (updateFunc: () => Tab[]) => void;
const useTabs = () => {
  const location = useLocation();
  const { tabItems, setActiveKey, setTabItems } = useTabsStore(
    useShallow((state) => ({
      tabItems: state.tabItems,
      setActiveKey: state.setActiveKey,
      setTabItems: state.setTabItems,
    })),
  );
  const flatMenuItems = useMenuStore((state) => state.flatMenuItems);
  const tabItemsRef = useRef<Tab[]>([]);
  useEffect(() => {
    const cachedTabItems: Tab[] = storage.getItem(RA_CACHED_TABS_KEY);
    if (cachedTabItems) {
      tabItemsRef.current = cachedTabItems.map((i) => ({
        ...i,
        icon: i['data-icon'],
      }));
    }
  }, []);
  useEffect(() => {
    if (flatMenuItems.length > 0) {
      const key = location.pathname;
      const existedTabItem = tabItemsRef.current.find((i) => i.key === key);
      const menuItem = flatMenuItems.find((i) => i.key === key);
      if (existedTabItem) {
        if (menuItem?.label === existedTabItem.label) {
          const newTabItems = [...tabItemsRef.current];
          setActiveKey(key);
          setCachedTabItems(newTabItems);
          setTabItems(newTabItems);
        } else {
          const newTabItems = [...tabItemsRef.current];
          newTabItems.forEach((item) => {
            const menuItem = flatMenuItems.find((i) => i.key === item.key);
            item.label = menuItem?.label;
          });
          tabItemsRef.current = newTabItems;
          setCachedTabItems(newTabItems);
          setTabItems(newTabItems);
        }
      } else {
        if (menuItem) {
          const tabItem: Tab = {
            label: menuItem.label,
            icon: menuItem.icon,
            key: menuItem.key,
            closable: HOME_PATH !== menuItem.key,
            pin: HOME_PATH === menuItem.key,
            disabled: false,
            children: null,
            ['data-icon']: menuItem['data-icon'],
          };
          setActiveKey(key);
          const newTabItems = [...tabItems];
          const homeTabItem = newTabItems!.find((i) => i.key === HOME_PATH);
          if (!homeTabItem) {
            const homeMenuItem = flatMenuItems.find((i) => i.key === HOME_PATH);
            if (homeMenuItem) {
              if (tabItem.key === HOME_PATH) {
                newTabItems.unshift(tabItem);
              } else {
                const homeItem = {
                  label: homeMenuItem.label,
                  icon: homeMenuItem.icon,
                  key: homeMenuItem.key,
                  closable: false,
                  pin: true,
                  disabled: false,
                  children: null,
                  ['data-icon']: homeMenuItem['data-icon'],
                };
                newTabItems.unshift(homeItem);
                newTabItems.push(tabItem);
              }
            }
          } else {
            newTabItems.push(tabItem);
          }
          tabItemsRef.current = newTabItems;
          setCachedTabItems(tabItemsRef.current);
          setTabItems(newTabItems);
        }
      }
    }
  }, [location.pathname, flatMenuItems]);
  const updateTabItems = useCallback((updateFunc: () => Tab[]) => {
    const newTabItems = updateFunc();
    tabItemsRef.current = newTabItems;
    setCachedTabItems(newTabItems);
    setTabItems(newTabItems);
  }, []);
  const setCachedTabItems = useCallback((items: Tab[]) => {
    const storageTabItems = items.map((i) => ({
      ...i,
      icon: i['data-icon'],
    }));
    storage.setItem(RA_CACHED_TABS_KEY, storageTabItems, 0);
  }, []);
  return {
    updateTabItems,
  };
};

export default useTabs;
