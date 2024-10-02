import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// import localforage from 'localforage';

import type { TabsProps } from '@/components/RaTabs';
import type { Tab } from '@/components/RaTabs/interface';

import { DB_CACHED_TABS_KEY } from '@/utils/constants';

import useMenu from './useMenu';

import useGlobalStore from '@/store';

const useTabs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);
  const [activeKey, setActiveKey] = useState('');
  const { flatMenuItems } = useMenu();
  const { appLanguage } = useGlobalStore();
  const tabItemsRef = useRef<Tab[]>([]);
  useEffect(() => {
    const dbCachedTabItemsString = localStorage.getItem(DB_CACHED_TABS_KEY);
    if (dbCachedTabItemsString) {
      const dbCachedTabItems = JSON.parse(dbCachedTabItemsString);
      setTabItems(dbCachedTabItems);
      tabItemsRef.current = dbCachedTabItems;
    }
    // 这里不用localforage存储的原因是他是一个异步操作，其拿到结果会晚于下一个effect执行
    // localforage.getItem<Tab[]>(DB_CACHED_TABS_KEY).then((dbCachedTabItems) => {
    //   console.log(dbCachedTabItems);
    //   if (dbCachedTabItems && dbCachedTabItems.length > 0) {
    //     setTabItems(dbCachedTabItems);
    //     tabItemsRef.current = dbCachedTabItems;
    //   }
    // });
  }, []);
  useEffect(() => {
    const key = location.pathname;
    const existedTabItem = tabItemsRef.current!.find((i) => i.key === key);
    if (existedTabItem) {
      setActiveKey(key);
      return;
    }
    const meunItem = flatMenuItems.find((i) => i.key === key);
    if (meunItem) {
      const tabItem: Tab = {
        label: t(`menu.${meunItem.label}`),
        labelI18n: meunItem.label,
        icon: meunItem.icon,
        key: meunItem.key,
        closable: import.meta.env.VITE_APP_HOME_PATH !== meunItem.key,
        pin: false,
        disabled: false,
        children: <></>,
      };
      // tabItemsRef.current = [...tabItemsRef.current, tabItem];
      tabItemsRef.current.push(tabItem);
      setActiveKey(key);
      setTabItems((pre) => {
        const newTabItems = [...pre!, tabItem];
        // localforage.setItem(DB_CACHED_TABS_KEY, newTabItems);
        localStorage.setItem(DB_CACHED_TABS_KEY, JSON.stringify(newTabItems));
        return newTabItems;
      });
    }
  }, [location.pathname, flatMenuItems]);
  useEffect(() => {
    const tabItems = tabItemsRef.current.map((item) => ({
      ...item,
      label: t(`menu.${item.labelI18n}`),
    }));
    setTabItems(tabItems);
    // localforage.setItem(DB_CACHED_TABS_KEY, tabItems);
    localStorage.setItem(DB_CACHED_TABS_KEY, JSON.stringify(tabItems));
  }, [appLanguage, tabItemsRef.current]);
  const updateTabItems = useCallback(
    (updateFunc: (preItems: Tab[]) => Tab[]) => {
      setTabItems((prevItems) => {
        return updateFunc(prevItems || []);
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
