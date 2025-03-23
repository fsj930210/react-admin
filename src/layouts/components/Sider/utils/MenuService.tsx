import type { IRouteObject } from '@/types/custom-types';
import type { MenuItem, MenuServiceOptions } from '@/types/menu';
import type { TFunction } from 'i18next';
export class MenuService {
  private static instance: MenuService;
  private options: MenuServiceOptions;

  private constructor(options: MenuServiceOptions = {}) {
    this.options = {
      defaultIcon: 'ant-design:appstore-outlined',
      defaultOpenMode: 'router',
      i18nPrefix: 'menu',
      ...options,
    };
  }

  /**
   * 获取菜单服务单例
   */
  public static getInstance(options?: MenuServiceOptions): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService(options);
    }
    return MenuService.instance;
  }

  /**
   * 从路由配置生成菜单项
   */
  public generateMenuFromRoutes(
    routes: IRouteObject[],
    translate: TFunction<'translation', undefined>,
  ): MenuItem[] {
    const menuItems: MenuItem[] = [];

    const processRoute = (
      route: IRouteObject,
      parentPath = '',
    ): MenuItem | null => {
      const { meta } = route;
      if (!meta?.menu) return null;

      const currentPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');

      const menuItem: MenuItem = {
        key: currentPath,
        title: meta.title || '',
        label: meta.title || '',
        path: currentPath,
        icon: meta.icon,
        hidden: meta.hidden,
        order: meta.order,
        openMode: meta.openMode,
        children: [],
      };

      if (route.children?.length) {
        const childMenus = route.children
          .map((child) => processRoute(child, currentPath))
          .filter(Boolean) as MenuItem[];

        if (childMenus.length) {
          menuItem.children = childMenus;
        }
      }

      return menuItem;
    };

    routes.forEach((route) => {
      const menuItem = processRoute(route);
      if (menuItem) {
        menuItems.push(menuItem);
      }
    });
    return this.processMenuItems(menuItems, translate);
  }

  /**
   * 处理菜单项，添加默认值和处理国际化
   */
  private processMenuItems(
    items: MenuItem[],
    translate: TFunction<'translation', undefined>,
  ): MenuItem[] {
    const processItem = (item: MenuItem): MenuItem => {
      const processed: MenuItem = {
        ...item,
        icon: item.icon || (this.options.defaultIcon as string),
        openMode: item.openMode || this.options.defaultOpenMode,
        label: translate(`${this.options.i18nPrefix}.${item.title}`),
      };

      if (item.children?.length) {
        processed.children = item.children.map((child) => processItem(child));
      }

      return processed;
    };

    return items.map((item) => processItem(item));
  }

  /**
   * 合并前端路由菜单和后端接口菜单
   */
  public mergeMenus(routeMenus: MenuItem[], apiMenus: MenuItem[]): MenuItem[] {
    const mergedMenus = [...routeMenus];

    const findAndMerge = (menu: MenuItem) => {
      const existingMenu = mergedMenus.find((m) => m.key === menu.key);
      if (existingMenu) {
        Object.assign(existingMenu, menu);
        if (menu.children?.length) {
          menu.children.forEach(findAndMerge);
        }
      } else {
        mergedMenus.push(menu);
      }
    };

    apiMenus.forEach(findAndMerge);
    return mergedMenus;
  }

  /**
   * 过滤隐藏的菜单项
   */
  public filterHiddenMenus(items: MenuItem[]): MenuItem[] {
    return items.filter((item) => {
      if (item.hidden) return false;
      if (item.children?.length) {
        item.children = this.filterHiddenMenus(item.children);
        return item.children.length > 0;
      }
      return true;
    });
  }

  /**
   * 排序菜单项
   */
  public sortMenuItems(items: MenuItem[]): MenuItem[] {
    const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
    sorted.forEach((item) => {
      if (item.children?.length) {
        item.children = this.sortMenuItems(item.children);
      }
    });
    return sorted;
  }
}
