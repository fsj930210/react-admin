# React 后台管理系统

## 项目初始化

1. 首先`git clone`远程仓库到本地
2. 然后 `pnpm create vite`创建项目
3. 安装依赖 `pnpm install`
4. 添加`prettier eslint-config-prettier eslint-plugin-prettier`依赖并创建`.prettierrc.cjs`文件，修改`eslintrc.cjs`配置
5. 添加依赖`vite-plugin-eslint`并在`vite`中引入`eslint` 插件，以便在开发阶段发现问题
6. 通过`husky` 在`git commit`时进行代码校验，添加`husky`依赖，然后在 `package.json` 中添加脚本 `prepare` 并运行
7. 通过`lint-staged`只对暂存区的代码进行检验，添加依赖`lint-stage`，然后在`package.json`添加相关配置。并在 `.husky/pre-commit` 中替换 `npm run lint` 为 `npx lint-staged`。现在我们每次提交代码前都会对改动的文件进行 `lint` 检查
8. 使用 `commitlint` 对提交信息进行校验，添加依赖`@commitlint/cli @commitlint/config-conventional`，然后在根目录创建配置文件 `.commitlintrc.cjs`，然后把 `commitlint` 命令也添加 `husky hook`
9. 运行项目`pnpm run dev`
10. 创建项目目录结构

```bash

# 1. 首先`git clone`远程仓库到本地
git clone https://github.com/fsj930210/react-admin.git
# 2. 然后 `pnpm create vite`创建项目 依次选择 . -> y -> React -> Typescript + SWC
pnpm create vite
# 3. 安装依赖 `pnpm install`
pnpm install
# 4. 添加`prettier eslint-config-prettier eslint-plugin-prettier`依赖并创建`.prettierrc.cjs`文件，修改`eslintrc.cjs`配置
# 5. 添加依赖`vite-plugin-eslint`并在`vite`中引入`eslint` 插件，以便在开发阶段发现问题
pnpm install vite-plugin-eslint -D

pnpm install prettier eslint-config-prettier eslint-plugin-prettier -D
# 6. 通过 `husky` 在 `git commit` 时进行代码校验，添加`husky`依赖，然后在 `package.json` 中添加脚本 `prepare` 并运行
pnpm install husky -D
pnpm pkg set scripts.prepare="husky install"
pnpm run prepare
# 给 husky 添加一个 hook
npx husky add .husky/pre-commit "npm run lint"
# 7. 通过`lint-staged`只对暂存区的代码进行检验，添加依赖`lint-stage`，然后在`package.json`添加相关配置。并在 `.husky/pre-commit` 中替换 `npm run lint` 为 `npx lint-staged`。现在我们每次提交代码前都会对改动的文件进行 `lint` 检查
pnpm install lint-staged -D
# 8. 使用 `commitlint` 对提交信息进行校验，添加依赖`@commitlint/cli @commitlint/config-conventional`，然后在根目录创建配置文件 `.commitlintrc.cjs`，然后把 `commitlint` 命令也添加 `husky hook`
pnpm install @commitlint/cli @commitlint/config-conventional -D
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
# 9. 运行项目`pnpm run dev`
pnpm run dev

```

## 项目技术栈

- react 18.x
- vite 5.x
- antd 5.x
- react-router 6.x
- zustand 4.x
- axios 1.x

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
