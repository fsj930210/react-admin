import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 系统工具
const systemUtilsRouter: IRouteObject[] = [
  {
    path: '/systemUtils',
    meta: {
      title: '系统工具',
      key: 'systemUtils',
      auth: true,
      menu: true,
      order: 10,
    },

    children: [
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
          title: '邮件工具',
          key: 'systemUtils/mail',
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
          title: '存储管理',
          key: 'systemUtils/storage',
        },
      },
    ],
  },
];

export default systemUtilsRouter;
