import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 系统工具
const systemUtilsRouter: IRouteObject[] = [
  {
    path: '/systemUtils',
    meta: {
      title: 'systemUtils',
      icon: 'carbon:tool-kit',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 10,
    },

    children: [
      {
        index: true,
        element: <RedirectRouteView to="/systemUtils/mail" />,
      },
      {
        path: 'mail',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/systemUtils/mail'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'eamilUtils',
          icon: 'lucide:mail',
        },
      },
      {
        path: 'storage',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/systemUtils/storage'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'storageManagement',
          icon: 'ant-design:database-outlined',
        },
      },
    ],
  },
];

export default systemUtilsRouter;
