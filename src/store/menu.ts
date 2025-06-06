import { create } from 'zustand';

import { HOME_PATH } from '@/utils/constants';

import { createSelector } from './createSelector';

import type { MenuItem } from '@/types/menu';

interface MenuState {
  // 侧边栏展开收起
  collapsed: boolean;
  menuItems: MenuItem[];
  flatMenuItems: Record<string, MenuItem>;
  accordion: boolean; // 手风琴模式
  toggleCollapsed: () => void;
  setMenuItems: (items: MenuItem[]) => void;
  setFlatMenuItems: (items: Record<string, MenuItem>) => void;
  setAccordion: (accordion: boolean) => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  collapsed: false,
  activeKey: HOME_PATH,
  menuItems: [],
  flatMenuItems: {},
  accordion: true,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setFlatMenuItems: (items: Record<string, MenuItem>) =>
    set(() => ({ flatMenuItems: items })),
  setMenuItems: (items: MenuItem[]) => set(() => ({ menuItems: items })),
  setAccordion: (accordion: boolean) => set(() => ({ accordion })),
}));

const useMenuStoreSelector = createSelector(useMenuStore);

export default useMenuStoreSelector;
