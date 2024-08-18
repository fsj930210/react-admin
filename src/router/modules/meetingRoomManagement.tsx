import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 会议室预定系统
const meetingRoomManagementRouter: IRouteObject[] = [
  {
    path: '/meetingRoomManagement',
    meta: {
      title: '会议室预定',
      icon: 'guidance:meeting-room',
      auth: true,
      menu: true,
      order: 14,
    },
    element: <RedirectRouteView to="/meetingRoomManagement/roomManagement" />,
    children: [
      {
        path: 'bookHistory',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/meetingRoomManagement/bookHistory'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '预定历史',
          icon: 'material-symbols-light:history',
        },
      },
      {
        path: 'bookManagement',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/meetingRoomManagement/bookManagement'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '预定管理',
          icon: 'lucide:swatch-book',
        },
      },
      {
        path: 'roomManagement',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/meetingRoomManagement/roomManagement'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '会议室管理',
          icon: 'hugeicons:meeting-room',
        },
      },
      {
        path: 'statistics',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/meetingRoomManagement/statistics'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '统计',
          icon: 'carbon:chart-combo',
        },
      },
    ],
  },
];

export default meetingRoomManagementRouter;
