import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import RaIcon from '@/components/RaIcon';

import type { BreadcrumbItem, IRouteObject } from '@/types/custom-types';
import type { BreadcrumbProps } from 'antd';

import routes from '@/router/routes';
import { flattenRoutes } from '@/router/utils';
import useGlobalStoreSelector from '@/store/global';

const useBreadcrumb = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProps['items']>([]);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { appLanguage } = useGlobalStoreSelector('appLanguage');
  // 获取扁平化的路由配置
  const flatRoutes = useMemo(() => {
    return flattenRoutes(routes);
  }, [routes]);

  // 生成面包屑项
  const generateBreadcrumbItem = useCallback(
    (path: string): BreadcrumbItem | null => {
      const route = flatRoutes.find((r) => r.path === path);
      if (!route?.meta?.menu) return null;
      return {
        key: path,
        title: t(`menu.${route.meta.title}`),
        path,
        icon: route?.meta?.icon || null,
      };
    },
    [flatRoutes],
  );

  // 生成面包屑列表
  const generateBreadcrumbs = useCallback(
    (currentPath: string): BreadcrumbProps['items'] => {
      const breadcrumbs: BreadcrumbProps['items'] = [];
      const pathSegments = currentPath.split('/').filter(Boolean);
      const parentPath = `/${pathSegments.slice(0, -1).join('/')}`;
      const breadcrumbItem = generateBreadcrumbItem(currentPath);
      const parentBreadcrumbItem = generateBreadcrumbItem(parentPath);
      const parentRoute = flatRoutes.find((r) => r.path === parentPath);
      if (parentBreadcrumbItem && parentRoute?.children) {
        parentBreadcrumbItem.menu = {
          items: parentRoute.children
            .filter((route) => route.path || !route.index)
            .map((route: IRouteObject) => ({
              key: `${parentPath}/${route.path}`,
              label: t(`menu.${route.meta?.title}`),
              icon: route.meta?.icon ? <RaIcon icon={route.meta.icon} /> : null,
            })),
          onClick: ({ key }) => navigate(key),
        };
        breadcrumbs.push(parentBreadcrumbItem);
      }
      if (breadcrumbItem) {
        breadcrumbs.push(breadcrumbItem);
      }
      return breadcrumbs;
    },
    [flatRoutes],
  );

  // 获取当前路径的面包屑
  useEffect(() => {
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    setBreadcrumbs(breadcrumbs);
  }, [location.pathname, appLanguage]);

  return breadcrumbs;
};

export default useBreadcrumb;
