import { create } from 'zustand';

import type { Tab } from '@/components/RaTabs/interface';

import { HOME_PATH } from '@/utils/constants';

interface TabsState {
  activeKey: string;
  tabItems: Tab[];
  setTabItems: (items: Tab[]) => void;
  setActiveKey: (key: string) => void;
}

const useTabsStore = create<TabsState>()((set) => ({
  activeKey: HOME_PATH,
  tabItems: [],
  setTabItems: (items: Tab[]) => set(() => ({ tabItems: items })),
  setActiveKey: (key: string) => set(() => ({ activeKey: key })),
}));

export default useTabsStore;
