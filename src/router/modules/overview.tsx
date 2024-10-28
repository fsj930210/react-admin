import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 概览
const overviewRouter: IRouteObject[] = [
  {
    path: '/overview',
    meta: {
      title: 'overview',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 1,
      icon: 'carbon:dashboard',
    },
    children: [
      {
        index: true,
        element: <RedirectRouteView to="/overview/workspace" />,
      },
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
          hidden: false,
          openMode: 'router',
          title: 'workspace',
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
          hidden: false,
          openMode: 'router',
          title: 'dashboard',
          icon: 'ri:dashboard-3-line',
        },
      },
    ],
  },
];

export default overviewRouter;
