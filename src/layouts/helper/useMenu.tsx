import { AppstoreOutlined } from '@ant-design/icons';

import type { IRouteObject, MenuItem } from '@/types/custom-types';

import routes from '@/router/routes';

function useMenu() {
  const menuItems: MenuItem[] = [];
  function formatRoutes(
    routes: IRouteObject[],
    menuItems?: MenuItem[],
    parentMenu?: MenuItem,
    parentRoute?: IRouteObject,
  ) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const meta = route.meta;
      let menuItem: MenuItem | null = null;
      if (meta?.menu) {
        menuItem = {
          label: meta.title as string,
          // key: meta.key as string,
          key: parentRoute?.meta?.menu
            ? ((parentMenu?.key + '/' + route.path) as string)
            : (route.path as string),
          icon: meta.icon ?? <AppstoreOutlined />,
        };
      }
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
