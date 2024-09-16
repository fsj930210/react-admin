import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 嵌套菜单
const nestedMenuRouter: IRouteObject[] = [
  {
    path: '/nestedMenu',
    meta: {
      title: 'nestedMenu',
      icon: 'ant-design:menu-outlined',
      auth: true,
      menu: true,
      order: 8,
    },

    children: [
      {
        index: true,
        element: <RedirectRouteView to="/nestedMenu/menu1" />,
      },
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
          title: 'nestedMenu1',
          icon: 'ant-design:menu-outlined',
        },
      },
      {
        path: 'menu2',
        meta: {
          auth: true,
          menu: true,
          title: 'nestedMenu2',
          icon: 'ri:menu-fold-4-line',
        },

        children: [
          {
            index: true,
            element: <RedirectRouteView to="/nestedMenu/menu2/menu2-1" />,
          },
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
              title: 'nestedMenu2-1',
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
          title: 'nestedMenu3',
          icon: 'ri:menu-unfold-4-line',
        },
        children: [
          {
            index: true,
            element: <RedirectRouteView to="/nestedMenu/menu3/menu3-1" />,
          },
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
              title: 'nestedMenu3-1',
              icon: 'ant-design:menu-outlined',
            },
          },
          {
            path: 'menu3-2',
            meta: {
              auth: true,
              menu: true,
              title: 'nestedMenu3-2',
              icon: 'ri:menu-unfold-4-line',
            },
            children: [
              {
                index: true,
                element: (
                  <RedirectRouteView to="/nestedMenu/menu3/menu3-2/menu3-2-1" />
                ),
              },
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
