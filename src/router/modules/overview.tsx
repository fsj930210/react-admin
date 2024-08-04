import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 概览
const overviewRouter: IRouteObject[] = [
  {
    path: '/overview',
    meta: {
      title: '概览',
      key: 'overview',
      auth: true,
      menu: true,
    },

    children: [
      {
        path: 'workspace',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/overview/workspace'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '工作台',
          key: 'overview/workspace',
        },
      },
      {
        path: 'dashboard',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/overview/dashboard'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '仪表盘',
          key: 'overview/dashboard',
        },
      },
    ],
  },
];

export default overviewRouter;
