import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 外部页面
const outerPageRouter: IRouteObject[] = [
  {
    path: '/outerPage',
    meta: {
      title: 'outerPage',
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
          title: 'outerPageIframe',
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
              title: 'nestjsIframe',
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
              title: 'reactIframe',
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
          title: 'outerLink',
          icon: 'ant-design:export-outlined',
        },
        element: <RedirectRouteView to="/outerPage/iframe/nestjs" />,
        children: [
          {
            path: 'https://ant-design.antgroup.com/index-cn',
            meta: {
              auth: true,
              menu: true,
              title: 'antdOuterLink',
              icon: 'ant-design:ant-design-outlined',
            },
          },
          {
            path: 'https://github.com/fsj930210/react-admin',
            meta: {
              auth: true,
              menu: true,
              title: 'projectGithub',
              icon: 'ant-design:github-outlined',
            },
          },
        ],
      },
    ],
  },
];

export default outerPageRouter;
