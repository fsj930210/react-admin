import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 权限管理
const errorRouter: IRouteObject[] = [
  {
    path: '/permissions',
    meta: {
      title: '权限管理',
      auth: true,
      menu: true,
      order: 3,
      icon: 'my-icon:permissions',
    },
    element: <RedirectRouteView to="/permissions/button" />,
    children: [
      {
        path: 'button',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/permissions/button'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '按钮权限',
          icon: 'my-icon:button-permissions',
        },
      },
      {
        path: 'page',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/permissions/page'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '页面权限',
          icon: 'my-icon:page-permissions',
        },
      },
    ],
  },
];

export default errorRouter;
