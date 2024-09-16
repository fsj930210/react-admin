import { lazy } from 'react';

import LazyLoadComponent from '@/components/LazyLoadComponent';

import RedirectRouteView from '../RedirectRouteView';

import type { IRouteObject } from '@/types/custom-types';

// 系统管理
const errorRouter: IRouteObject[] = [
  {
    path: '/systemManagement',
    meta: {
      title: 'systemManagement',
      auth: true,
      menu: true,
      icon: 'tdesign:system-setting',
      order: 11,
    },

    children: [
      {
        index: true,
        element: <RedirectRouteView to="/systemManagement/user" />,
      },
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
          title: 'userManagement',
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
          title: 'roleManagement',
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
          title: 'organizationManagement',
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
          title: 'menuManagement',
          icon: 'ra-icon:menu-management',
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
          title: 'dictionaryManagement',
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
          title: 'paramsConfig',
          icon: 'carbon:parameter',
        },
      },
      {
        path: 'systemMonitor',
        meta: {
          auth: true,
          menu: true,
          title: 'systemMonitor',
          icon: 'mdi:monitor-eye',
        },

        children: [
          {
            index: true,
            element: (
              <RedirectRouteView to="/systemManagement/systemMonitor/loginLogs" />
            ),
          },
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
              title: 'loginLogs',
              icon: 'ra-icon:login-logs',
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
              title: 'onlineUsers',
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
              title: 'serviceMonitor',
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
          title: 'taskScheduler',
          icon: 'ra-icon:task-scheduler',
        },

        children: [
          {
            index: true,
            element: (
              <RedirectRouteView to="/systemManagement/taskScheduler/taskLogs" />
            ),
          },
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
              icon: 'ra-icon:task-logs',
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
              title: 'taskManagement',
              icon: 'fluent:task-list-square-settings-20-regular',
            },
          },
        ],
      },
    ],
  },
];

export default errorRouter;
