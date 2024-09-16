import { BreadcrumbProps } from 'antd';
import { create } from 'zustand';

interface MenuState {
  // 侧边栏展开收起
  collapsed: boolean;
  /**
   * @description
   * map的key是location.path，value是一个对象，
   * value的key是appLanguage，value的value是面包屑list
   * 不刷新浏览器使用这里的值，这样不用每次都去生成面包屑
   * 刷新浏览器使用indexDB里面的缓存，并会设置这里的值
   */
  cachedBreadcrumbListMap: Map<
    string,
    Record<string, BreadcrumbProps['items']>
  >;
  toggleCollapsed: () => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  collapsed: false,
  breadcrumbList: [],
  cachedBreadcrumbListMap: new Map(),
  cachedMenuItemsMap: new Map(),
  cachedFlatMenuItemsMap: new Map(),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));

export default useMenuStore;
