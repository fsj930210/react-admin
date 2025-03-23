import { create } from 'zustand';

import { HOME_PATH } from '@/utils/constants';

import { createSelector } from './createSelector';

import type { MenuItem } from '@/types/menu';

interface SiderState {
  // 侧边栏展开收起
  collapsed: boolean;
  menuItems: MenuItem[];
  flatMenuItems: MenuItem[];
  toggleCollapsed: () => void;
  setMenuItems: (items: MenuItem[]) => void;
  setFlatMenuItems: (items: MenuItem[]) => void;
}

const useSiderStore = create<SiderState>()((set) => ({
  collapsed: false,
  activeKey: HOME_PATH,
  menuItems: [],
  flatMenuItems: [],
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setFlatMenuItems: (items: MenuItem[]) =>
    set(() => ({ flatMenuItems: items })),
  setMenuItems: (items: MenuItem[]) => set(() => ({ menuItems: items })),
}));

const useSiderStoreSelector = createSelector(useSiderStore);

export default useSiderStoreSelector;
