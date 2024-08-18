import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 外部页面
const outerPageRouter: IRouteObject[] = [
  {
    path: '/outerPage',
    meta: {
      title: '外部页面',
      icon: 'carbon:link',
      auth: true,
      menu: true,
      order: 9,
    },
    element: <RedirectRouteView to="/outerPage/iframe/nestjs" />,
    children: [
      {
        path: 'iframe',
        meta: {
          auth: true,
          menu: true,
          title: '内嵌',
          icon: 'material-symbols-light:iframe-outline',
        },
        element: <RedirectRouteView to="/outerPage/iframe/nestjs" />,
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
              icon: 'simple-icons:nestjs',
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
              icon: 'carbon:logo-react',
            },
          },
        ],
      },
      {
        path: 'outer',
        meta: {
          auth: true,
          menu: true,
          title: '外链',
          icon: 'ant-design:export-outlined',
        },
        element: <RedirectRouteView to="/outerPage/iframe/nestjs" />,
        children: [
          {
            path: 'https://ant-design.antgroup.com/index-cn',
            meta: {
              auth: true,
              menu: true,
              title: 'antd文档',
              icon: 'ant-design:ant-design-outlined',
            },
          },
          {
            path: 'https://github.com/fsj930210/react-admin',
            meta: {
              auth: true,
              menu: true,
              title: '项目github',
              icon: 'ant-design:github-outlined',
            },
          },
        ],
      },
    ],
  },
];

export default outerPageRouter;
