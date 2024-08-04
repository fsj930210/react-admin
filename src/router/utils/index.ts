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

  return routes;
}
