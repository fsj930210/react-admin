# react 后台管理系统

一个开箱即用的`react`中后台管理系统，内含完善的核心功能开发文档。

已实现功能：

1. 基于配置式的路由
2. 基于路由的侧边栏、面包屑
3. 多标签页
4. 国际化
5. 明暗主题切换
6. 三种风格的登录页
7. 全局菜单搜索
8. 图标组件

待实现：
基于文件的约定式路由（`vite`插件已写好，但没有进行验证，在`file-router`分支上）

后续更新计划：

1. 已开发完成的文档编写
2. 后端基本功能的开发
3. 各个路由对应的页面开发

前端技术栈:

- react
- react-router-v6
- antd5
- ahooks
- zustand
- unocss
- lightningcss

开发文档：

1. [项目搭建](./docs/项目搭建.md)
2. [基于配置的路由侧边栏面包屑](./docs/路由侧边栏面包屑.md)

后端功能包括：

- 登录注册 鉴权
- 用户管理
- 角色管理
- 组织管理
- 菜单管理
- 国际化
- 系统任务调度、定时任务
- 服务监控
- 网盘管理
- 会议室预定

后端技术栈：

- nestjs
- typeorm
- mysql
- primsa
- redis
