import type { IRouteObject } from '@/types/custom-types';

export function getRoutes() {
  const routes: IRouteObject[] = [];

  // * 导入所有route
  const metaRoutes: Record<string, any> = import.meta.glob('../modules/*.tsx', {
    eager: true,
  });
  Object.keys(metaRoutes).forEach((item) => {
    Object.keys(metaRoutes[item]).forEach((key: any) => {
      routes.push(...metaRoutes[item][key]);
    });
  });
  // 根据order排序，升序排列，值越小越在前面
  routes.sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0));
  return routes;
}

/**
 * 路由平铺函数
 * @param routes 路由配置数组
 * @param parentPath 父路由路径
 * @returns 平铺后的路由数组
 */
export function flattenRoutes(
  routes: IRouteObject[],
  parentPath: string = '',
): IRouteObject[] {
  const result: IRouteObject[] = [];

  routes.forEach((route) => {
    // 跳过 index 路由
    if (route.index) return;

    // 构建完整路径
    const currentPath = parentPath
      ? `${parentPath}/${route.path || ''}`.replace(/\/+/g, '/')
      : route.path || '';

    // 创建新的路由对象，避免修改原对象
    const flatRoute: IRouteObject = {
      ...route,
      path: currentPath,
    };

    // 添加到结果数组
    result.push(flatRoute);

    // 递归处理子路由
    if (route.children?.length) {
      result.push(...flattenRoutes(route.children, currentPath));
    }
  });

  return result;
}
