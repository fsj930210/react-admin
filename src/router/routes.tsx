import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RouteErrorBoundary from './RouteErrorBoundary';
import { getRoutes } from './utils';

import type { IRouteObject } from '@/types/custom-types';

import Layout from '@/layouts/index';
import ErrorPage404 from '@/pages/page/error/404';

const routeArray = getRoutes();

const routes: IRouteObject[] = [
  {
    path: '/login',
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/login'))} />
    ),
    meta: {
      menu: false,
    },
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <Navigate to="/overview/workspace" replace />,
        meta: {
          menu: false,
        },
      },
      ...routeArray,
      {
        path: '*',
        element: <ErrorPage404 />,
        meta: {
          menu: false,
        },
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage404 />,
    meta: {
      menu: false,
    },
  },
];

export default routes;
