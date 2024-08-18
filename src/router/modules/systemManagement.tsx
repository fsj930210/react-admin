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
      icon: 'tdesign:system-setting',
      order: 11,
    },
    element: <RedirectRouteView to="/systemManagement/user" />,
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
          icon: 'lucide:user-round-cog',
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
          icon: 'oui:app-users-roles',
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
          icon: 'fluent:organization-20-regular',
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
          icon: 'my-icon:menu-management',
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
          icon: 'streamline:dictionary-language-book',
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
          icon: 'carbon:parameter',
        },
      },
      {
        path: 'systemMonitor',
        meta: {
          auth: true,
          menu: true,
          title: '系统监控',
          icon: 'mdi:monitor-eye',
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
              icon: 'my-icon:login-logs',
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
              icon: 'carbon:user-online',
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
              icon: 'eos-icons:monitoring',
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
          icon: 'my-icon:task-scheduler',
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
              icon: 'my-icon:task-logs',
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
              icon: 'fluent:task-list-square-settings-20-regular',
            },
          },
        ],
      },
    ],
  },
];

export default errorRouter;
