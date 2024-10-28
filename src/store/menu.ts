import { create } from 'zustand';

import { HOME_PATH } from '@/utils/constants';

interface MenuState {
  // 侧边栏展开收起
  collapsed: boolean;
  activeKey: string;
  toggleCollapsed: () => void;
  setActiveKey: (key: string) => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  collapsed: false,
  activeKey: HOME_PATH,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setActiveKey: (key: string) => set(() => ({ activeKey: key })),
}));

export default useMenuStore;
