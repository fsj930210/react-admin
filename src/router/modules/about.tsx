import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 关于项目
const aboutRouter: IRouteObject[] = [
  {
    path: '/about',
    meta: {
      title: '关于项目',
      auth: true,
      menu: true,
      order: 18,
      icon: 'carbon:information',
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/about'))} />
    ),
  },
];

export default aboutRouter;
