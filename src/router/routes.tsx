import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import Layout from '@/layouts/index';

const routes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <LazyLoadComponent Component={lazy(() => import('@/pages/login'))} />
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: (
          <LazyLoadComponent Component={lazy(() => import('@/pages/home'))} />
        ),
      },
      {
        path: 'about',
        element: (
          <LazyLoadComponent Component={lazy(() => import('@/pages/about'))} />
        ),
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
];

export default routes;
