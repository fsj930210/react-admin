import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '@/components/RaIcon';

import type { IRouteObject, MenuItem } from '@/types/custom-types';

import routes from '@/router/routes';
import useGlobalStoreSelector from '@/store/global';
import useMenuStore from '@/store/sider';
import { dfs } from '@/utils';

function formatRoutes({
  routes,
  menuItems,
  parentRoute,
  parentMenu,
}: {
  routes: IRouteObject[]; // 路由数组也会是路由嵌套children
  menuItems: MenuItem[]; // 最后返回的菜单，嵌套的时候是对应的children
  parentMenu?: MenuItem; // 父菜单
  parentRoute?: IRouteObject; // 父路由
}) {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const meta = route.meta;
    let menuItem: MenuItem | null = null;
    if (meta?.menu) {
      menuItem = {
        title: meta.title as string,
        label: meta.title as string,
        hidden: !!meta.hidden,
        // 如果是菜单用父菜单的key加当前路由的path组成，这样既能是唯一的也是当前菜单的完整路由
        key: parentRoute?.meta?.menu
          ? ((parentMenu?.key + '/' + route.path) as string)
          : (route.path as string),
        icon: (
          <Icon
            icon={meta?.icon || 'ant-design:appstore-outlined'}
            wrapClassName="leading-none mr-[4]"
          />
        ),
        ['data-icon']: meta?.icon || 'ant-design:appstore-outlned',
      };
    }
    // 有嵌套路由递归遍历
    if (route.children && route.children.length > 0) {
      menuItem = menuItem || { children: [], key: '', label: '' };
      menuItem.children = [];
      formatRoutes({
        routes: route.children,
        menuItems: menuItem.children,
        parentMenu: menuItem,
        parentRoute: route,
      });
    }
    if (menuItem) {
      menuItems?.push(menuItem);
    }
  }
}
function useMenu() {
  const { t } = useTranslation();
  const appLanguage = useGlobalStoreSelector((state) => state.appLanguage);
  const { setFlatMenuItems, setMenuItems } = useMenuStore([
    'setFlatMenuItems',
    'setMenuItems',
  ]);
  const menuItemsRef = useRef<MenuItem[]>([]);
  const flatMenuItemsRef = useRef<MenuItem[]>([]);
  useEffect(() => {
    const menuItems: MenuItem[] = [];
    formatRoutes({
      routes,
      menuItems,
    });
    menuItemsRef.current = menuItems[0].children as MenuItem[];
    flatMenuItemsRef.current = dfs(menuItemsRef.current);
  }, [routes]);

  useEffect(() => {
    const filteredMenuItems: MenuItem[] = [];
    function translate(menuItems: MenuItem[], filteredMenuItems: MenuItem[]) {
      for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        item.label = t(`menu.${item.title}`);
        const cloneItem = { ...item };
        if (item.children && item.children.length > 0) {
          const cloneItemChildren: MenuItem[] = [];
          translate(item.children, cloneItemChildren);
          cloneItem.children = cloneItemChildren;
        }
        if (!cloneItem.hidden) {
          filteredMenuItems.push(cloneItem);
        }
      }
    }
    translate(menuItemsRef.current, filteredMenuItems);
    setMenuItems(filteredMenuItems);
    const newFlatMenuItems = flatMenuItemsRef.current.map((i) => ({
      ...i,
      label: t(`menu.${i.title}`),
    }));
    setFlatMenuItems(newFlatMenuItems);
  }, [appLanguage]);
}

export default useMenu;
