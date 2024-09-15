import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 聊天室
const chartroomRouter: IRouteObject[] = [
  {
    path: '/chatroom',
    meta: {
      title: 'chatroom',
      auth: true,
      menu: true,
      order: 16,
      icon: 'ra-icon:chatroom',
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/chatroom'))} />
    ),
  },
];

export default chartroomRouter;
