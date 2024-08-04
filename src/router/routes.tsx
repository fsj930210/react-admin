import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Error404 from '@/components/Error/404';
import LazyLoadComponent from '@/components/LazyLoadComponent';

import { getRoutes } from './utils';

import Layout from '@/layouts/index';
import { IRouteObject } from '@/types/custom-types';

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
        element: <Error404 />,
        meta: {
          menu: false,
        },
      },
    ],
  },
];

export default routes;
