import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 数据大屏
const dataViewRouter: IRouteObject[] = [
  {
    path: '/dataView',
    meta: {
      title: '数据大屏',
      key: 'dataView',
      auth: true,
      menu: true,
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/dataView'))} />
    ),
  },
];

export default dataViewRouter;
