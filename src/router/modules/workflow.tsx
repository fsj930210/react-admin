import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 工作流
const workflowRouter: IRouteObject[] = [
  {
    path: '/workflow',
    meta: {
      title: '工作流',
      key: 'workflow',
      auth: true,
      menu: true,
      order: 17,
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/workflow'))} />
    ),
  },
];

export default workflowRouter;
