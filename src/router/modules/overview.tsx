import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 概览
const overviewRouter: IRouteObject[] = [
  {
    path: '/overview',
    meta: {
      title: '概览',
      auth: true,
      menu: true,
      order: 1,
      icon: 'carbon:dashboard',
    },
    element: <RedirectRouteView to="/overview/workspace" />,
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
          icon: 'carbon:workspace',
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
          icon: 'ri:dashboard-3-line',
        },
      },
    ],
  },
];

export default overviewRouter;
