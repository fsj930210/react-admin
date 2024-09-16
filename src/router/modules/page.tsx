import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 各种页面
const pageRouter: IRouteObject[] = [
  {
    path: '/page',
    meta: {
      title: 'page',
      auth: true,
      menu: true,
      order: 6,
      icon: 'ri:pages-line',
    },

    children: [
      {
        index: true,
        element: <RedirectRouteView to="/page/css" />,
      },
      {
        path: 'css',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/css'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'cssPage',
          icon: 'ri:css3-line',
        },
      },
      {
        path: 'error',
        meta: {
          auth: true,
          menu: true,
          title: 'errorPage',
          icon: 'mdi:lightbulb-error-outline',
        },
        children: [
          {
            path: '403',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/error/403'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'errorPage403',
              icon: 'carbon:error',
            },
          },
          {
            path: '404',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/error/404'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'errorPage404',
              icon: 'tabler:error-404',
            },
          },
          {
            path: '500',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/error/500'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'errorPage500',
              icon: 'carbon:data-error',
            },
          },
        ],
      },
      {
        path: 'list',
        meta: {
          auth: true,
          menu: true,
          title: 'listPage',
          icon: 'ri:list-view',
        },
        element: <RedirectRouteView to="/page/list/cardList" />,
        children: [
          {
            path: 'cardList',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/list/cardList'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'cardListPage',
              icon: 'material-symbols-light:featured-play-list-outline',
            },
          },
          {
            path: 'normalList',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/list/defaultList'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'normalListPage',
              icon: 'ri:file-list-line',
            },
          },
        ],
      },
    ],
  },
];

export default pageRouter;
