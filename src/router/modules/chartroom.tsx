import type { IRouteObject } from '@/types/custom-types';

// 聊天室
const chartroomRouter: IRouteObject[] = [
  {
    path: '/chartroom',
    meta: {
      title: '聊天室',
      key: 'chartroom',
      auth: true,
      menu: true,
      order: 15,
    },
  },
];

export default chartroomRouter;
