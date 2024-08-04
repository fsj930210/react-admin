import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 关于项目
const bookManagementRouter: IRouteObject[] = [
  {
    path: '/bookManagement',
    meta: {
      title: '图书管理',
      key: 'bookManagement',
      auth: true,
      menu: true,
    },
    element: (
      <LazyLoadComponent
        Component={lazy(() => import('@/pages/bookManagement'))}
      />
    ),
  },
];

export default bookManagementRouter;
