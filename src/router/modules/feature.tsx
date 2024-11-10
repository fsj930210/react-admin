import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 功能
const featureRouter: IRouteObject[] = [
  {
    path: '/feature',
    meta: {
      title: 'feature',
      icon: 'mdi:feature-highlight',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 7,
    },
    children: [
      {
        index: true,
        element: <RedirectRouteView to="/feature/clipboard" />,
      },
      {
        path: 'icon',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/feature/icon'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'icon',
          icon: 'lineicons:emoji-smile',
        },
      },
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
          hidden: false,
          openMode: 'router',
          title: 'clipboard',
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
          hidden: false,
          openMode: 'router',
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
          hidden: false,
          openMode: 'router',
          title: 'fileDownload',
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
          hidden: false,
          openMode: 'router',
          title: 'screenshot',
          icon: 'ri:screenshot-line',
        },
      },
    ],
  },
];

export default featureRouter;
