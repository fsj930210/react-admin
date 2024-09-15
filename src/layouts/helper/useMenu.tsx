import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';

import type { IRouteObject, MenuItem } from '@/types/custom-types';

import routes from '@/router/routes';

function useMenu() {
  const { t } = useTranslation();
  const menuItems: MenuItem[] = [];
  function formatRoutes(
    routes: IRouteObject[], // 路由数组也会是路由嵌套children
    menuItems?: MenuItem[], // 最后返回的菜单，嵌套的时候是对应的children
    parentMenu?: MenuItem, // 父菜单
    parentRoute?: IRouteObject, // 父路由
  ) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const meta = route.meta;
      let menuItem: MenuItem | null = null;
      if (meta?.menu) {
        menuItem = {
          label: t(`menu.${meta.title as string}`),
          // key: meta.key as string,
          // 如果是菜单用父菜单的key加当前路由的path组成，这样既能是唯一的也是当前菜单的完整路由
          key: parentRoute?.meta?.menu
            ? ((parentMenu?.key + '/' + route.path) as string)
            : (route.path as string),
          icon: <Icon icon={meta.icon || 'ant-design:appstore-outlined'} />,
        };
      }
      // 有嵌套路由递归遍历
      if (route.children) {
        menuItem = menuItem || { children: [], key: '', label: '' };
        menuItem.children = [];
        formatRoutes(route.children, menuItem?.children, menuItem, route);
      }
      menuItem && menuItems?.push(menuItem);
    }
  }
  formatRoutes(routes, menuItems);
  const realMenItems = menuItems[0].children || [];
  // console.log(realMenItems);
  return { menuItems: realMenItems };
}

export default useMenu;
