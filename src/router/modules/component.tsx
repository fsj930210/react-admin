import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 组件
const componentRouter: IRouteObject[] = [
  {
    path: '/component',
    meta: {
      title: '组件',
      icon: 'lucide:component',
      auth: true,
      menu: true,
      order: 5,
    },
    element: <RedirectRouteView to="/component/clickOutSide" />,
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
          icon: 'material-symbols-light:drag-click-rounded',
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
          icon: 'carbon:web-services-container',
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
          icon: 'material-symbols-light:dialogs-outline-rounded',
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
          icon: 'my-icon:plate',
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
          icon: 'ant-design:table-outlined',
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
          icon: 'lucide:arrow-left-right',
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
          icon: 'carbon:tree-view',
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
          icon: 'lucide:upload',
        },
      },
    ],
  },
];

export default componentRouter;
