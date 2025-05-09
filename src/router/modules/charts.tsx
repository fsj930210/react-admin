import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 图表
const chartsRouter: IRouteObject[] = [
  {
    path: '/charts',
    meta: {
      title: 'charts',
      auth: true,
      menu: true,
      hidden: false,
      openMode: 'router',
      order: 4,
      icon: 'carbon:chart-histogram',
    },
    children: [
      {
        index: true,
        element: <RedirectRouteView to="/charts/amap" />,
      },
      {
        path: 'amap',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/charts/amap'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'amap',
          icon: 'ra-icon:amap',
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
          hidden: false,
          openMode: 'router',
          title: 'bmap',
          icon: 'ra-icon:bmap',
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
          hidden: false,
          openMode: 'router',
          title: 'googleMap',
          icon: 'ra-icon:google-map',
        },
      },
      {
        path: 'echarts',
        meta: {
          auth: true,
          menu: true,
          hidden: false,
          openMode: 'router',
          title: 'echarts',
          icon: 'ra-icon:echarts',
        },
        children: [
          {
            index: true,
            element: <RedirectRouteView to="/charts/echarts/basic" />,
          },
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
              hidden: false,
              openMode: 'router',
              title: 'echartsBasic',
              icon: 'ra-icon:echarts-basic',
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
              hidden: false,
              openMode: 'router',
              title: 'echartsAdvance',
              icon: 'ra-icon:echarts-advance',
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
              hidden: false,
              openMode: 'router',
              title: 'echartsMap',
              icon: 'ra-icon:echarts-map',
            },
          },
        ],
      },
    ],
  },
];

export default chartsRouter;
