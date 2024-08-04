import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import type { IRouteObject } from '@/types/custom-types';

// 各种页面
const pageRouter: IRouteObject[] = [
  {
    path: '/page',
    meta: {
      title: '页面',
      key: 'page',
      auth: true,
      menu: true,
    },

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
          key: 'page/bossJDSpider',
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
          key: 'page/css',
        },
      },
      {
        path: 'error',
        meta: {
          auth: true,
          menu: true,
          title: '缺省页',
          key: 'page/error',
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
              key: 'page/error/403',
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
              key: 'page/error/404',
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
              key: 'page/error/500',
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
          key: 'page/gifCompression',
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
          key: 'page/graphqlTodoList',
        },
      },
      {
        path: 'list',
        meta: {
          auth: true,
          menu: true,
          title: '列表',
          key: 'page/list',
        },
        children: [
          {
            path: 'cardList',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/list/cardList'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '卡片列表',
              key: 'page/list/cardList',
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
              key: 'page/error/defaultList',
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
          key: 'page/nearBySearch',
        },
      },
      {
        path: 'rankList',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/rankList'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '各种排行榜',
          key: 'page/rankList',
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
          key: 'page/reactPlayground',
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
          key: 'page/shortUrl',
        },
      },
      {
        path: 'user',
        meta: {
          auth: true,
          menu: true,
          title: '个人页面',
          key: 'page/user',
        },
        children: [
          {
            path: 'profile',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/user/profile'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '个人中心',
              key: 'page/user/profile',
            },
          },
          {
            path: 'settings',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/page/user/settings'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '个人设置',
              key: 'page/user/settings',
            },
          },
        ],
      },
      {
        path: 'weather',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/page/weather'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '天气服务',
          key: 'page/weather',
        },
      },
    ],
  },
];

export default pageRouter;
