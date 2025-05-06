import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { dfs } from '@/utils/utils';

import { MenuService } from './MenuService';

import routes from '@/router/routes';
import { flattenRoutes } from '@/router/utils';
import useGlobalStoreSelector from '@/store/global';
import useRouteStoreSelector from '@/store/route';
import useSiderStoreSelector from '@/store/sider';

/**
 * 菜单处理 Hook
 */
export function useMenu() {
  const { t } = useTranslation();
  const appLanguage = useGlobalStoreSelector((state) => state.appLanguage);
  const { setMenuItems, setFlatMenuItems } = useSiderStoreSelector([
    'setMenuItems',
    'setFlatMenuItems',
  ]);
  const { setFlatRoutes, setRoutes } = useRouteStoreSelector([
    'setRoutes',
    'setFlatRoutes',
  ]);
  const [loading, setLoading] = useState(false);

  /**
   * 初始化菜单
   */
  const initializeMenus = async () => {
    try {
      setLoading(true);
      setRoutes(routes);
      setFlatRoutes(flattenRoutes(routes));
      const menuService = MenuService.getInstance();

      // 从路由生成菜单
      const routeMenus = menuService.generateMenuFromRoutes(routes, t);
      // 获取后端菜单（如果需要）
      // const apiMenus = await fetchApiMenus();
      // const mergedMenus = menuService.mergeMenus(routeMenus, apiMenus);

      // 处理菜单
      const processedMenus = menuService.sortMenuItems(
        menuService.filterHiddenMenus(routeMenus),
      );
      // 更新菜单状态
      setMenuItems(processedMenus);
      // 扁平化菜单
      const flatMenuItems = dfs(processedMenus);
      setFlatMenuItems(flatMenuItems);
    } catch (error) {
      console.error('Failed to initialize menus:', error);
    } finally {
      setLoading(false);
    }
  };

  // 监听语言变化，重新初始化菜单
  useEffect(() => {
    initializeMenus();
  }, [appLanguage]);

  return {
    loading,
    refreshMenus: initializeMenus,
  };
}
