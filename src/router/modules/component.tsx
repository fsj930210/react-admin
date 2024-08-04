import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 组件
const componentRouter: IRouteObject[] = [
  {
    path: '/component',
    meta: {
      title: '组件',
      key: 'component',
      auth: true,
      menu: true,
      order: 5,
    },

    children: [
      {
        path: 'clickOutSide',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/clickOutSide'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'clickOutside组件',
          key: 'component/clickOutSide',
        },
      },
      {
        path: 'container',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/container'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '容器组件',
          key: 'component/container',
        },
      },
      {
        path: 'modal',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/modal'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '可拖拽弹窗组件',
          key: 'component/modal',
        },
      },
      {
        path: 'plate',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/plate'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '车牌组件',
          key: 'component/plate',
        },
      },
      {
        path: 'table',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/table'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '表格组件',
          key: 'component/table',
        },
      },
      {
        path: 'transfer',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/transfer'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '穿梭框组件',
          key: 'component/transfer',
        },
      },
      {
        path: 'tree',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/tree'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '树组件',
          key: 'component/tree',
        },
      },
      {
        path: 'upload',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/component/upload'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '上传组件',
          key: 'component/upload',
        },
      },
    ],
  },
];

export default componentRouter;
