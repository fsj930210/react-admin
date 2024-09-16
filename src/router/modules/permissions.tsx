import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 权限管理
const errorRouter: IRouteObject[] = [
  {
    path: '/permissions',
    meta: {
      title: 'permissions',
      auth: true,
      menu: true,
      order: 3,
      icon: 'ra-icon:permissions',
    },
    children: [
      {
        index: true,
        element: <RedirectRouteView to="/permissions/button" />,
      },
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
          title: 'buttonPermissions',
          icon: 'ra-icon:button-permissions',
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
          title: 'pagePermissions',
          icon: 'ra-icon:page-permissions',
        },
      },
    ],
  },
];

export default errorRouter;
