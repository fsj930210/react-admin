import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 外部页面
const outerPageRouter: IRouteObject[] = [
  {
    path: '/outerPage',
    meta: {
      title: '外部页面',
      key: 'outerPage',
      auth: true,
      menu: true,
      order: 9,
    },

    children: [
      {
        path: 'iframe',
        meta: {
          auth: true,
          menu: true,
          title: '内嵌',
          key: 'outerPage/iframe',
        },
        children: [
          {
            path: 'nestjs',
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () => import('@/pages/outerPage/iframe/nestjs'),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'nestjs文档',
              key: 'outerPage/iframe/nestjs',
            },
          },
          {
            path: 'react',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/outerPage/iframe/react'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'react文档',
              key: 'outerPage/iframe/react',
            },
          },
        ],
      },
    ],
  },
];

export default outerPageRouter;
