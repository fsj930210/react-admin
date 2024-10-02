import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAsyncEffect } from 'ahooks';
// import localforage from 'localforage';
import { cloneDeep } from 'lodash-es';

import Icon from '@/components/Icon';

// import {
//   DB_CACHED_FLAT_MENU_ITEMS_KEY,
//   DB_CACHED_MENU_ITEMS_KEY,
// } from '@/utils/constants';

import type { IRouteObject, MenuItem } from '@/types/custom-types';
import type { TFunction } from 'i18next';

import routes from '@/router/routes';
import useGlobalStore from '@/store';
import { dfs } from '@/utils';

function formatRoutes({
  routes,
  menuItems,
  parentRoute,
  parentMenu,
  t,
}: {
  routes: IRouteObject[]; // 路由数组也会是路由嵌套children
  menuItems?: MenuItem[]; // 最后返回的菜单，嵌套的时候是对应的children
  parentMenu?: MenuItem; // 父菜单
  parentRoute?: IRouteObject; // 父路由
  t: TFunction<'translation', undefined>;
}) {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const meta = route.meta;
    let menuItem: MenuItem | null = null;
    if (meta?.menu) {
      menuItem = {
        label: meta.title as string,
        // 如果是菜单用父菜单的key加当前路由的path组成，这样既能是唯一的也是当前菜单的完整路由
        key: parentRoute?.meta?.menu
          ? ((parentMenu?.key + '/' + route.path) as string)
          : (route.path as string),
        icon: meta?.icon || 'ant-design:appstore-outlined',
      };
    }
    // 有嵌套路由递归遍历
    if (route.children && route.children.length > 0) {
      menuItem = menuItem || { children: [], key: '', label: '' };
      menuItem.children = [];
      formatRoutes({
        routes: route.children,
        menuItems: menuItem?.children,
        parentMenu: menuItem,
        parentRoute: route,
        t,
      });
    }
    menuItem && menuItems?.push(menuItem);
  }
}
function formatMenuList(
  menuList: MenuItem[],
  t: TFunction<'translation', undefined>,
) {
  menuList.forEach((item) => {
    item.icon = (
      <Icon icon={item.icon as string} wrapClassName="leading-none mr-[4]" />
    );
    item.label = t(`menu.${item.label}`);
    const children = item.children;
    if (children) {
      formatMenuList(children, t);
    }
  });
}

function useMenu() {
  const { t } = useTranslation();
  const { appLanguage } = useGlobalStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const flatMenuItemsRef = useRef<MenuItem[]>([]);
  const stringIconMenuItemsRef = useRef<MenuItem[]>([]);
  function setItems(menuItems: MenuItem[]) {
    const jsxIconMenuItems: MenuItem[] = cloneDeep(menuItems);
    formatMenuList(jsxIconMenuItems, t);
    setMenuItems(jsxIconMenuItems);
  }
  useAsyncEffect(async () => {
    if (
      flatMenuItemsRef.current.length > 0 &&
      stringIconMenuItemsRef.current.length > 0
    ) {
      setItems(stringIconMenuItemsRef.current);
      return;
    }
    // 这里如果需要本地缓存菜单则可以解注释代码
    // 如果菜单是动态变化的还是不需要本地缓存，内存缓存就行了
    // const dbMenuItemsMap = await localforage.getItem<
    //   Record<string, MenuItem[]>
    // >(DB_CACHED_MENU_ITEMS_KEY);
    // const dbFlatMenuItemsMap = await localforage.getItem<
    //   Record<string, MenuItem[]>
    // >(DB_CACHED_FLAT_MENU_ITEMS_KEY);
    // if (dbMenuItemsMap && dbFlatMenuItemsMap) {
    //   // 由于localforage不能保存jsx和function 所以需要保存为字符串模式
    //   const dbMenuItems = dbMenuItemsMap[appLanguage];
    //   const dbFlatMenuItems = dbFlatMenuItemsMap[appLanguage];
    //   if (dbMenuItems && dbFlatMenuItems) {
    //     setItems(dbMenuItems);
    //     flatMenuItemsRef.current = dbFlatMenuItems;
    //     stringIconMenuItemsRef.current = dbMenuItems;
    //     return;
    //   }
    // }
    const menuItems: MenuItem[] = [];
    formatRoutes({
      routes,
      menuItems: menuItems,
      t,
    });
    const stringIconMenuItems = menuItems[0].children || [];
    const flatMenuItems = dfs(stringIconMenuItems);
    flatMenuItemsRef.current = flatMenuItems;
    stringIconMenuItemsRef.current = stringIconMenuItems;
    setItems(stringIconMenuItems);
    // 如果需要本地缓存菜单则解注释就行
    // localforage.setItem(DB_CACHED_MENU_ITEMS_KEY, {
    //   ...(dbMenuItemsMap || {}),
    //   [appLanguage]: stringIconMenuItems,
    // });
    // localforage.setItem(DB_CACHED_FLAT_MENU_ITEMS_KEY, {
    //   ...(dbFlatMenuItemsMap || {}),
    //   [appLanguage]: flatMenuItems,
    // });
  }, [routes, appLanguage]);

  return {
    menuItems,
    flatMenuItems: flatMenuItemsRef.current,
    stringIconMenuItems: stringIconMenuItemsRef.current,
  };
}

export default useMenu;
