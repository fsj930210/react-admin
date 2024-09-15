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
      order: 12,
    },
    element: <RedirectRouteView to="/netdiskManagement/overview" />,
    children: [
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
          title: 'netdiskFile',
          icon: 'ri:file-cloud-line',
        },
      },
    ],
  },
];

export default diskManagementRouter;
