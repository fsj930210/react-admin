import { BreadcrumbProps } from 'antd';
import { create } from 'zustand';

interface MenuState {
  collapsed: boolean;
  breadcrumbList: any[];
  toggleCollapsed: () => void;
  setBreadcrumbList: (breadcrumbList: BreadcrumbProps['items']) => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  collapsed: false,
  breadcrumbList: [],
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setBreadcrumbList: (breadcrumbList) =>
    set(() => ({
      breadcrumbList: breadcrumbList,
    })),
}));

export default useMenuStore;
