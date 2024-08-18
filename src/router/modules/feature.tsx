import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 功能
const featureRouter: IRouteObject[] = [
  {
    path: '/feature',
    meta: {
      title: '功能',
      icon: 'mdi:feature-highlight',
      auth: true,
      menu: true,
      order: 7,
    },
    element: <RedirectRouteView to="/feature/clipboard" />,
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
          icon: 'lucide:clipboard-copy',
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
          icon: 'ri:file-excel-2-line',
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
          icon: 'ri:file-download-line',
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
          icon: 'ri:screenshot-line',
        },
      },
    ],
  },
];

export default featureRouter;
