import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 组件
const componentRouter: IRouteObject[] = [
  {
    path: '/component',
    meta: {
      title: 'component',
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
          title: 'clickOutsideComponent',
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
          title: 'containerComponent',
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
          title: 'modalComponent',
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
          title: 'plateComponent',
          icon: 'ra-icon:plate',
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
          title: 'tableComponent',
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
          title: 'transferComponent',
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
          title: 'treeComponent',
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
          title: 'uploadComponent',
          icon: 'lucide:upload',
        },
      },
    ],
  },
];

export default componentRouter;
