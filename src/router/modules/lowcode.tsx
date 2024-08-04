import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 低代码
const lowcodeRouter: IRouteObject[] = [
  {
    path: '/lowcode',
    meta: {
      title: '低代码',
      key: 'lowcode',
      auth: true,
      menu: true,
    },
    children: [
      {
        path: 'formDesigner',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/lowcode/formDesigner'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '表单设计器',
          key: 'lowcode/formDesigner',
        },
      },
      {
        path: 'h5Designer',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/lowcode/h5Designer'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'h5设计器',
          key: 'lowcode/h5Designer',
        },
      },
      {
        path: 'dataViewDesigner',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/lowcode/dataViewDesigner'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '数据大屏设计器',
          key: 'lowcode/dataViewDesigner',
        },
      },
    ],
  },
];

export default lowcodeRouter;
