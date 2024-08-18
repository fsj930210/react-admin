import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 各种页面
const pageRouter: IRouteObject[] = [
  {
    path: '/page',
    meta: {
      title: '页面',
      auth: true,
      menu: true,
      order: 6,
      icon: 'ri:pages-line',
    },
    element: <RedirectRouteView to="/page/graphqlTodoList" />,
    children: [
      {
        path: 'bossJDSpider',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/bossJDSpider'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'boss直聘招聘爬虫',
          icon: 'mdi:spider-outline',
        },
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
          title: 'css',
          icon: 'ri:css3-line',
        },
      },
      {
        path: 'error',
        meta: {
          auth: true,
          menu: true,
          title: '缺省页',
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
              title: '403',
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
              title: '404',
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
              title: '500',
              icon: 'carbon:data-error',
            },
          },
        ],
      },
      {
        path: 'gifCompression',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/gifCompression'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'gif压缩工具',
          icon: 'ant-design:file-gif-outlined',
        },
      },
      {
        path: 'graphqlTodoList',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/gifCompression'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'graphqlTodoList',
          icon: 'lucide:list-todo',
        },
      },
      {
        path: 'list',
        meta: {
          auth: true,
          menu: true,
          title: '列表',
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
              title: '卡片列表',
              icon: 'material-symbols-light:featured-play-list-outline',
            },
          },
          {
            path: 'defaultList',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/list/defaultList'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '标准列表',
              icon: 'ri:file-list-line',
            },
          },
        ],
      },
      {
        path: 'nearBySearch',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/nearBySearch'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '附近充电宝搜索',
          icon: 'material-symbols-light:nearby',
        },
      },
      {
        path: 'reactPlayground',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/reactPlayground'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: 'reactPlayground',
          icon: 'fluent:dual-screen-pagination-24-regular',
        },
      },
      {
        path: 'shortUrl',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/shortUrl'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '短链服务',
          icon: 'carbon:url',
        },
      },
    ],
  },
];

export default pageRouter;
