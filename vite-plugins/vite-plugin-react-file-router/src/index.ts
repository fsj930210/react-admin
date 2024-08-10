/**
 * @description 一个基于react-router v6的约定式路由vite插件
 * 支持配置路由元信息，布局组件和路由组件分离
 * 此插件是基于vite-plugin-pages做的二次开发
 * 只保留了react相关的代码并在其上做出扩展
 * vite-plugin-pages项目地址：https://github.com/hannoeru/vite-plugin-pages
 */
import {
  PLUGIN_NAME,
  RESOLVED_VIRTUAL_MODULE_ID,
  VIRTUAL_MODULE_ID,
} from './constants';
import { PageContext } from './context';

import type { UserOptions } from './types';
import type { Plugin } from 'vite';

function viteReactFileRouterPlugin(userOptions: UserOptions = {}): Plugin {
  let ctx: PageContext;
  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    async configResolved(config) {
      ctx = new PageContext(userOptions, config.root);
      // 将现有的目录生成路由
      await ctx.init();
    },
    configureServer(server) {
      ctx.setupViteServer(server);
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
      return null;
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        // 生成路由
        return ctx.resolveRoutes();
      }
    },
  };
}

export * from './types';
export type { ReactRoute } from './resolvers/react';

export default viteReactFileRouterPlugin;
