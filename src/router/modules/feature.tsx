import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 功能
const featureRouter: IRouteObject[] = [
  {
    path: '/feature',
    meta: {
      title: '功能',
      key: 'feature',
      auth: true,
      menu: true,
      order: 7,
    },

    children: [
      {
        path: 'clipboard',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/clipboard'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '剪切板',
          key: 'feature/clipboard',
        },
      },
      {
        path: 'excel',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/excel'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'excel',
          key: 'feature/excel',
        },
      },
      {
        path: 'fileDownload',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/fileDownload'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '文件下载',
          key: 'feature/fileDownload',
        },
      },
      {
        path: 'fullScreen',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/fullScreen'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '全屏',
          key: 'feature/fullScreen',
        },
      },
      {
        path: 'lockScreen',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/lockScreen'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '锁屏',
          key: 'feature/lockScreen',
        },
      },
      {
        path: 'print',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/print'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '打印',
          key: 'feature/print',
        },
      },
      {
        path: 'rightClick',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/rightClick'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '右键点击',
          key: 'feature/rightClick',
        },
      },
      {
        path: 'screenshot',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/screenshot'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '截图',
          key: 'feature/screenshot',
        },
      },
    ],
  },
];

export default featureRouter;
