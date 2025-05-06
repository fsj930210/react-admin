import { create } from 'zustand';

import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH } from '@/utils/constants';

import { createSelector } from './createSelector';

interface TabsState {
  activeKey: string;
  tabItems: Tab[];
  draggable: boolean;
  tabStyle: 'chrome' | 'card' | 'classic' | 'trapezoid' | 'brisk' | 'rhythm';
  setTabItems: (items: Tab[]) => void;
  setActiveKey: (key: string) => void;
  setTabStyle: (style: TabsState['tabStyle']) => void;
}

const useTabsStore = create<TabsState>()((set) => ({
  activeKey: HOME_PATH,
  setActiveKey: (key: string) => set(() => ({ activeKey: key })),
  tabItems: [],
  setTabItems: (items: Tab[]) => set(() => ({ tabItems: items })),
  draggable: true,
  setDraggable: (draggable: boolean) => set(() => ({ draggable })),
  tabStyle: 'trapezoid',
  setTabStyle: (style: TabsState['tabStyle']) =>
    set(() => ({ tabStyle: style })),
}));

const useTabsStoreSelector = createSelector(useTabsStore);

export default useTabsStoreSelector;
