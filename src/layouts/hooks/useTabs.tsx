import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import localforage from 'localforage';

import type { TabsProps } from '@/components/RaTabs';
import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH } from '@/utils/constants';

import useMenu from './useMenu';

const useTabs = () => {
  const location = useLocation();
  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);
  const [activeKey, setActiveKey] = useState('');
  const { flatMenuItems } = useMenu();
  const tabItemsRef = useRef<Tab[]>([]);
  useEffect(() => {
    // const dbCachedTabItemsString = localStorage.getItem(DB_CACHED_TABS_KEY);
    // if (dbCachedTabItemsString) {
    //   const dbCachedTabItems = JSON.parse(dbCachedTabItemsString);
    //   setTabItems(dbCachedTabItems);
    //   tabItemsRef.current = dbCachedTabItems;
    // }
  }, []);
  useEffect(() => {
    const key = location.pathname;
    const existedTabItem = tabItemsRef.current!.find((i) => i.key === key);

    const menuItem = flatMenuItems.find((i) => i.key === key);
    if (existedTabItem && menuItem?.label === existedTabItem.label) {
      setActiveKey(key);
      return;
    } else if (existedTabItem && menuItem?.label !== existedTabItem.label) {
      setTabItems((prev) => {
        const newTabItems = [...(prev as Tab[])];
        newTabItems.forEach((item) => {
          const menuItem = flatMenuItems.find((i) => i.key === item.key);
          item.label = menuItem?.label;
        });
        return newTabItems;
      });
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
        };
        setActiveKey(key);
        setTabItems((pre) => {
          const newTabItems = [...pre!];
          const homeTabItem = pre!.find((i) => i.key === HOME_PATH);
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
                };
                newTabItems.unshift(homeItem);
                newTabItems.push(tabItem);
              }
            }
          } else {
            newTabItems.push(tabItem);
          }
          tabItemsRef.current = newTabItems;
          // localforage.setItem(DB_CACHED_TABS_KEY, newTabItems);
          // localStorage.setItem(DB_CACHED_TABS_KEY, JSON.stringify(newTabItems));
          return newTabItems;
        });
      }
    }
  }, [location.pathname, flatMenuItems]);
  const updateTabItems = useCallback(
    (updateFunc: (preItems: Tab[]) => Tab[]) => {
      setTabItems((prevItems) => {
        const newTabItems = updateFunc(prevItems || []);
        tabItemsRef.current = newTabItems;
        return newTabItems;
      });
    },
    [],
  );
  return {
    tabItems,
    activeKey,
    updateTabItems,
    setActiveKey,
  };
};

export default useTabs;
