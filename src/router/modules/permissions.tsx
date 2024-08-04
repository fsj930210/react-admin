import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 权限管理
const errorRouter: IRouteObject[] = [
  {
    path: '/permissions',
    meta: {
      title: '权限管理',
      key: 'permissions',
      auth: true,
      menu: true,
      order: 3,
    },
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
          key: 'permissions/button',
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
          key: 'permissions/page',
        },
      },
    ],
  },
];

export default errorRouter;
