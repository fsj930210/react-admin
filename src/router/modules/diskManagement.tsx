import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 网盘管理
const diskManagementRouter: IRouteObject[] = [
  {
    path: '/diskManagement',
    meta: {
      title: '网盘管理',
      key: 'diskManagement',
      auth: true,
      menu: true,
      order: 12,
    },
    element: <RedirectRouteView to="/diskManagement/overview" />,
    children: [
      {
        path: 'overview',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/diskManagement/overview'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '网盘概览',
          key: 'diskManagement/overview',
        },
      },
      {
        path: 'file',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/diskManagement/file'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '文件管理',
          key: 'diskManagement/file',
        },
      },
    ],
  },
];

export default diskManagementRouter;
