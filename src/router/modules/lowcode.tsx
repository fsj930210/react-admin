import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 低代码
const lowcodeRouter: IRouteObject[] = [
  {
    path: '/lowcode',
    meta: {
      title: '低代码',
      icon: 'streamline:code-monitor-1',
      auth: true,
      menu: true,
      order: 15,
    },
    element: <RedirectRouteView to="/lowcode/formDesigner" />,
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
          icon: 'material-symbols-light:dynamic-form-outline',
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
          icon: 'hugeicons:mobile-programming-01',
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
          icon: 'wpf:statistics',
        },
      },
    ],
  },
];

export default lowcodeRouter;
