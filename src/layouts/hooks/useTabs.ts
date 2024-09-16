import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAsyncEffect } from 'ahooks';
import localforage from 'localforage';

import type { TabsProps } from '@/components/RaTabs';
import type { Tab as RaTab } from '@/components/RaTabs/interface';

import { DB_CACHED_TABS_KEY } from '@/utils/constants';

import useMenu from './useMenu';

import useGlobalStore from '@/store';
export type Tab = RaTab & {
  pin?: boolean;
  labelI18n?: string;
};
const useTabs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [tabItems, setTabItems] = useState<TabsProps['items']>([]);
  const [activeKey, setActiveKey] = useState('');
  const { flatMenuItems } = useMenu();
  const { appLanguage } = useGlobalStore();
  const tabItemsRef = useRef<Tab[]>([]);
  useAsyncEffect(async () => {
    const dbCachedTabItems =
      await localforage.getItem<Tab[]>(DB_CACHED_TABS_KEY);
    if (dbCachedTabItems && dbCachedTabItems.length > 0) {
      setTabItems(dbCachedTabItems);
      tabItemsRef.current = dbCachedTabItems;
    }
  }, []);
  useEffect(() => {
    const key = location.pathname;
    const existedTabItem = tabItems!.find((i) => i.key === key);
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
        children: null,
      };
      tabItemsRef.current = [...tabItemsRef.current, tabItem];
      setActiveKey(key);
      setTabItems((pre) => {
        const newTabItems = [...pre!, tabItem];
        localforage.setItem(DB_CACHED_TABS_KEY, newTabItems);
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
    localforage.setItem(DB_CACHED_TABS_KEY, tabItems);
  }, [appLanguage, tabItemsRef.current]);
  return {
    tabItems,
    activeKey,
    setTabItems,
    setActiveKey,
  };
};

export default useTabs;
