import { create } from 'zustand';

interface MenuState {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  collapsed: false,
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));

export default useMenuStore;
