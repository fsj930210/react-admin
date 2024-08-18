import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 聊天室
const chartroomRouter: IRouteObject[] = [
  {
    path: '/chatroom',
    meta: {
      title: '聊天室',
      auth: true,
      menu: true,
      order: 16,
      icon: 'my-icon:chatroom',
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/chatroom'))} />
    ),
  },
];

export default chartroomRouter;
