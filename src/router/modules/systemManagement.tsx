import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 系统管理
const errorRouter: IRouteObject[] = [
  {
    path: '/systemManagement',
    meta: {
      title: '系统管理',
      auth: true,
      menu: true,
      key: 'systemManagement',
      order: 11,
    },

    children: [
      {
        path: 'user',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/systemManagement/user'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '用户管理',
          key: 'systemManagement/user',
        },
      },
      {
        path: 'role',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/systemManagement/role'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '角色管理',
          key: 'systemManagement/role',
        },
      },
      {
        path: 'organization',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/systemManagement/organization'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '组织管理',
          key: 'systemManagement/organization',
        },
      },
      {
        path: 'menu',
        element: (
          <LazyLoadComponent
            Component={lazy(() => import('@/pages/systemManagement/menu'))}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '菜单管理',
          key: 'systemManagement/menu',
        },
      },
      {
        path: 'dictionary',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/systemManagement/dictionary'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '字典管理',
          key: 'systemManagement/dictionary',
        },
      },
      {
        path: 'paramsConfig',
        element: (
          <LazyLoadComponent
            Component={lazy(
              () => import('@/pages/systemManagement/paramsConfig'),
            )}
          />
        ),
        meta: {
          auth: true,
          menu: true,
          title: '参数配置',
          key: 'systemManagement/paramsConfig',
        },
      },
      {
        path: 'systemMonitor',
        meta: {
          auth: true,
          menu: true,
          title: '系统监控',
          key: 'systemManagement/systemMonitor',
        },
        element: (
          <RedirectRouteView to="/systemManagement/systemMonitor/loginLogs" />
        ),
        children: [
          {
            path: 'loginLogs',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () =>
                    import('@/pages/systemManagement/systemMonitor/loginLogs'),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '登录日志',
              key: 'systemManagement/systemMonitor/loginLogs',
            },
          },
          {
            path: 'onlineUsers',
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () =>
                    import(
                      '@/pages/systemManagement/systemMonitor/onlineUsers'
                    ),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '在线用户',
              key: 'systemManagement/systemMonitor/onlineUsers',
            },
          },
          {
            path: 'serviceMonitor',
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () =>
                    import(
                      '@/pages/systemManagement/systemMonitor/serviceMonitor'
                    ),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '服务监控',
              key: 'systemManagement/systemMonitor/serviceMonitor',
            },
          },
        ],
      },
      {
        path: 'taskScheduler',
        meta: {
          auth: true,
          menu: true,
          title: '任务调度',
          key: 'systemManagement/taskScheduler',
        },
        element: (
          <RedirectRouteView to="/systemManagement/taskScheduler/taskLogs" />
        ),
        children: [
          {
            path: 'taskLogs',
            index: true,
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () =>
                    import('@/pages/systemManagement/taskScheduler/taskLogs'),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '任务日志',
              key: 'systemManagement/taskScheduler/taskLogs',
            },
          },
          {
            path: 'taskManagement',
            element: (
              <LazyLoadComponent
                Component={lazy(
                  () =>
                    import(
                      '@/pages/systemManagement/taskScheduler/taskManagement'
                    ),
                )}
              />
            ),
            meta: {
              auth: true,
              menu: true,
              title: '任务管理',
              key: 'systemManagement/taskScheduler/taskManagement',
            },
          },
        ],
      },
    ],
  },
];

export default errorRouter;
