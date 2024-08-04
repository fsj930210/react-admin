import { IRouteObject } from '@/types/custom-types';

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
