import { create } from 'zustand';

import { HOME_PATH } from '@/utils/constants';

import { createSelector } from './createSelector';

import type { TabItem } from '@/layouts/components/common/LayoutTabs/components/Tabs/interface';

export type TabStyle =
  | 'chrome'
  | 'card'
  | 'classic'
  | 'trapezoid'
  | 'line1'
  | 'line2';
interface TabsState {
  activeKey: string;
  tabItems: TabItem[];
  draggable: boolean;
  tabStyle: TabStyle;
  setTabItems: (items: TabItem[]) => void;
  setActiveKey: (key: string) => void;
  setTabStyle: (style: TabsState['tabStyle']) => void;
}

const useTabsStore = create<TabsState>()((set) => ({
  activeKey: HOME_PATH,
  setActiveKey: (key: string) => set(() => ({ activeKey: key })),
  tabItems: [],
  setTabItems: (items: TabItem[]) => set(() => ({ tabItems: items })),
  draggable: false,
  setDraggable: (draggable: boolean) => set(() => ({ draggable })),
  tabStyle: 'chrome',
  setTabStyle: (style: TabsState['tabStyle']) =>
    set(() => ({ tabStyle: style })),
}));

const useTabsStoreSelector = createSelector(useTabsStore);

export default useTabsStoreSelector;
