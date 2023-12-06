# React 后台管理系统

## 项目技术栈

- react 18.x
- vite 5.x
- antd 5.x
- react-router 6.x
- zustand 4.x
- axios 1.x
- unocss 0.58

## 项目结构

```text
react-admin
├─ .husky                 # husky配置文件
├─ public                 # 静态资源文件
├─ src
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ hooks               # 自定义 hooks
│  ├─ layouts             # 框架布局
│  ├─ locales             # 国际化
│  ├─ pages               # 页面视图
│  ├─ router              # 路由管理
│  ├─ services            # api管理
│  ├─ store               # store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .commitlintrc.cjs      # commit配置文件
├─ .env                   # 基础配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .eslintrc.cjs          # eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.cjs        # prettier 配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ pnpm-lock.yaml         # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```
