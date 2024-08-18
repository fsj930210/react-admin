import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 嵌套菜单
const nestedMenuRouter: IRouteObject[] = [
  {
    path: '/nestedMenu',
    meta: {
      title: '嵌套菜单',
      icon: 'ant-design:menu-outlined',
      auth: true,
      menu: true,
      order: 8,
    },
    element: <RedirectRouteView to="/nestedMenu/menu1" />,
    children: [
      {
        path: 'menu1',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/nestedMenu/menu1'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '菜单1',
          icon: 'ant-design:menu-outlined',
        },
      },
      {
        path: 'menu2',
        meta: {
          auth: true,
          menu: true,
          title: '菜单2',
          icon: 'ri:menu-fold-4-line',
        },
        element: <RedirectRouteView to="/nestedMenu/menu2/menu2-1" />,
        children: [
          {
            path: 'menu2-1',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () => import('@/pages/nestedMenu/menu2/menu2-1'),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '菜单2-1',
              icon: 'ant-design:menu-outlined',
            },
          },
        ],
      },
      {
        path: 'menu3',
        meta: {
          auth: true,
          menu: true,
          title: '菜单3',
          icon: 'ri:menu-unfold-4-line',
        },
        element: <RedirectRouteView to="/nestedMenu/menu3/menu3-1" />,
        children: [
          {
            path: 'menu3-1',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () => import('@/pages/nestedMenu/menu3/menu3-1'),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '菜单3-1',
              icon: 'ant-design:menu-outlined',
            },
          },
          {
            path: 'menu3-2',
            meta: {
              auth: true,
              menu: true,
              title: '菜单3-2',
              icon: 'ri:menu-unfold-4-line',
            },
            element: (
              <RedirectRouteView to="/nestedMenu/menu3/menu3-2/menu3-2-1" />
            ),
            children: [
              {
                path: 'menu3-2-1',
                element: (
                  <LazyLoadComponent
                    Component={lazy(
                      () =>
                        import('@/pages/nestedMenu/menu3/menu3-2/menu3-2-1'),
                    )}
                  />
                ),
                meta: {
                  auth: true,
                  menu: true,
                  title: '菜单3-2-1',
                  icon: 'ant-design:menu-outlined',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default nestedMenuRouter;
