import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 数据大屏
const dataViewRouter: IRouteObject[] = [
  {
    path: '/dataView',
    meta: {
      title: 'dataView',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 2,
      icon: 'ant-design:pie-chart-outlined',
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/dataView'))} />
    ),
  },
];

export default dataViewRouter;
