import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 概览
const chartroomRouter: IRouteObject[] = [
  {
    path: '/chartroom',
    meta: {
      title: '聊天室',
      key: 'chartroom',
      auth: true,
      menu: true,
    },

    children: [
      {
        path: 'chart',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/chartroom/chart'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '聊天',
          key: 'chartroom/chart',
        },
      },
      {
        path: 'collections',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/chartroom/collections'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '收藏',
          key: 'chartroom/collections',
        },
      },
      {
        path: 'friends',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/chartroom/friends'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '好友',
          key: 'chartroom/friends',
        },
      },
      {
        path: 'notifications',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/chartroom/notifications'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '通知',
          key: 'chartroom/notifications',
        },
      },
    ],
  },
];

export default chartroomRouter;
