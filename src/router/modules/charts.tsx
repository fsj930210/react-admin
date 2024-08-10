import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 图表
const chartsRouter: IRouteObject[] = [
  {
    path: '/charts',
    meta: {
      title: '图表',
      key: 'charts',
      auth: true,
      menu: true,
      order: 4,
    },
    element: <RedirectRouteView to="/charts/amap" />,
    children: [
      {
        path: 'amap',
        index: true,
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/charts/amap'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '高德地图',
          key: 'charts/amap',
        },
      },
      {
        path: 'bmap',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/charts/bmap'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '百度地图',
          key: 'charts/bmap',
        },
      },
      {
        path: 'googleMap',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/charts/googleMap'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '谷歌地图',
          key: 'charts/googleMap',
        },
      },
      {
        path: 'echarts',
        meta: {
          auth: true,
          menu: true,
          title: 'echarts图表',
          key: 'charts/echarts',
        },
        element: <RedirectRouteView to="/charts/echarts/basic" />,
        children: [
          {
            path: 'basic',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/charts/echarts/basic'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'echarts基础图表',
              key: 'charts/echarts/basic',
            },
          },
          {
            path: 'advance',
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/charts/echarts/advance'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'echarts高级图表',
              key: 'charts/echarts/advance',
            },
          },
          {
            path: 'map',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(() => import('@/pages/charts/echarts/map'))}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: 'echarts地图',
              key: 'charts/echarts/map',
            },
          },
        ],
      },
    ],
  },
];

export default chartsRouter;
