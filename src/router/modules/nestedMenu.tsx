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
      key: 'nestedMenu',
      auth: true,
      menu: true,
      order: 8,
    },

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
          key: 'nestedMenu/menu1',
        },
      },
      {
        path: 'menu2',
        meta: {
          auth: true,
          menu: true,
          title: '菜单2',
          key: 'nestedMenu/menu2',
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
              key: 'nestedMenu/menu2/menu2-1',
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
          key: 'nestedMenu/menu3',
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
              key: 'nestedMenu/menu3/menu3-1',
            },
          },
          {
            path: 'menu3-2',
            meta: {
              auth: true,
              menu: true,
              title: '菜单3-2',
              key: 'nestedMenu/menu3/menu3-2',
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
                  key: 'nestedMenu/menu3/menu3-2/menu3-2-1',
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
