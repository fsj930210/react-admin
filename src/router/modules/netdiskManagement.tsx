import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 网盘管理
const diskManagementRouter: IRouteObject[] = [
  {
    path: '/netdiskManagement',
    meta: {
      title: 'netdiskManagement',
      icon: 'ant-design:cloud-server-outlined',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 12,
    },

    children: [
      {
        index: true,
        element: <RedirectRouteView to="/netdiskManagement/overview" />,
      },
      {
        path: 'overview',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/netdiskManagement/overview'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'netdiskOverview',
          icon: 'arcticons:diskdigger-pro',
        },
      },
      {
        path: 'file',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/netdiskManagement/file'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'netdiskFile',
          icon: 'ri:file-cloud-line',
        },
      },
    ],
  },
];

export default diskManagementRouter;
