import { dequal } from 'dequal';

import { getRouteBlock } from '../customBlock';
import { generateClientCode } from '../stringify';
import {
  buildReactRemixRoutePath,
  buildReactRoutePath,
  countSlash,
  normalizeCase,
} from '../utils';

import type { PageContext } from '../context';
import type {
  CustomBlock,
  Optional,
  PageResolver,
  ResolvedOptions,
} from '../types';

export interface ReactRouteBase {
  caseSensitive?: boolean;
  children?: ReactRouteBase[];
  element?: string;
  index?: boolean;
  path?: string;
  rawRoute: string;
  customBlock?: CustomBlock;
}

export interface ReactRoute
  extends Omit<Optional<ReactRouteBase, 'rawRoute' | 'path'>, 'children'> {
  children?: ReactRoute[];
}

function prepareRoutes(
  routes: ReactRoute[],
  options: ResolvedOptions,
  parent?: ReactRoute,
) {
  for (const route of routes) {
    if (parent) route.path = route.path?.replace(/^\//, '');

    if (route.children)
      route.children = prepareRoutes(route.children, options, route);

    delete route.rawRoute;
    // 将解析到的元信息加入到路由上去
    if (route.customBlock) {
      Object.assign(route, route.customBlock || {});
      delete route.customBlock;
    }
    Object.assign(route, options.extendRoute?.(route, parent) || {});
  }

  return routes;
}

async function computeReactRoutes(
  ctx: PageContext,
  customBlockMap: Map<string, CustomBlock>,
): Promise<ReactRoute[]> {
  const { routeStyle, caseSensitive, importPath } = ctx.options;
  const nuxtStyle = routeStyle === 'nuxt';

  const pageRoutes = [...ctx.pageRouteMap.values()];
  const layoutRoutes = [...ctx.layoutRouteMap.values()]
    // sort routes for HMR
    .sort((a, b) => countSlash(a.route) - countSlash(b.route));

  const routes: ReactRouteBase[] = [];

  pageRoutes.forEach((page) => {
    const pathNodes = page.route.split('/');
    const customBlock = customBlockMap.get(page.path);
    const element =
      importPath === 'relative' ? page.path.replace(ctx.root, '') : page.path;
    let parentRoutes = routes;

    for (let i = 0; i < pathNodes.length; i++) {
      const node = pathNodes[i];

      const route: ReactRouteBase = {
        caseSensitive,
        path: '',
        rawRoute: pathNodes.slice(0, i + 1).join('/'),
        customBlock,
      };

      if (i === pathNodes.length - 1) route.element = element;

      const isIndexRoute = normalizeCase(node, caseSensitive).endsWith('index');

      if (!route.path && isIndexRoute) {
        route.path = '/';
      } else if (!isIndexRoute) {
        if (routeStyle === 'remix') route.path = buildReactRemixRoutePath(node);
        else route.path = buildReactRoutePath(node, nuxtStyle);
      }
      // Check parent exits
      const parent = parentRoutes.find((parent) => {
        return pathNodes.slice(0, i).join('/') === parent.rawRoute;
      });

      if (parent) {
        const layout = layoutRoutes.find(
          (layout) => layout.route === parent.rawRoute,
        );
        if (layout) {
          const layoutElement =
            importPath === 'relative'
              ? layout.path.replace(ctx.root, '')
              : layout.path;
          const layoutCustomBlock = customBlockMap.get(layout.path);
          parent.customBlock = layoutCustomBlock;
          parent.element = layoutElement;
        }
        // Make sure children exits in parent
        parent.children = parent.children || [];
        // Append to parent's children
        parentRoutes = parent.children;
      }

      const exits = parentRoutes.some((parent) => {
        return pathNodes.slice(0, i + 1).join('/') === parent.rawRoute;
      });
      if (!exits) parentRoutes.push(route);
    }
  });

  // sort by dynamic routes
  const finalRoutes = prepareRoutes(routes, ctx.options);
  // 如果useIndexAsRoot为true，需要在这里处理
  const useIndexAsRoot = ctx.options.useIndexAsRoot;
  const excludeRoutesFromRootRoute = ctx.options.excludeRoutesFromRootRoute;
  let resolvedRoutes: ReactRoute[] = [];
  if (useIndexAsRoot) {
    const rootRoute = finalRoutes.find(
      (route) => route.path === '' || route.path === '/',
    );
    if (rootRoute) {
      const filteredRoutes = finalRoutes.filter(
        (route) =>
          !excludeRoutesFromRootRoute.includes(route.path as string) &&
          route.path !== rootRoute.path,
      );
      rootRoute.children = rootRoute.children
        ? [...rootRoute.children, ...filteredRoutes]
        : [...filteredRoutes];
      const otherRoutes = finalRoutes.filter(
        (route) =>
          excludeRoutesFromRootRoute.includes(route.path as string) &&
          route.path !== rootRoute.path,
      );
      resolvedRoutes.push(rootRoute, ...otherRoutes);
    } else {
      resolvedRoutes = finalRoutes;
    }
  } else {
    resolvedRoutes = finalRoutes;
  }
  resolvedRoutes =
    (await ctx.options.onRoutesGenerated?.(resolvedRoutes)) || resolvedRoutes;

  return resolvedRoutes;
}

async function resolveReactRoutes(
  ctx: PageContext,
  customBlockMap: Map<string, CustomBlock>,
) {
  const finalRoutes = await computeReactRoutes(ctx, customBlockMap);
  let client = generateClientCode(finalRoutes, ctx.options);
  client = (await ctx.options.onClientGenerated?.(client)) || client;
  return client;
}

export function reactResolver(): PageResolver {
  const customBlockMap = new Map<string, CustomBlock>();

  async function checkCustomBlockChange(ctx: PageContext, path: string) {
    const exitsCustomBlock = customBlockMap.get(path);
    let customBlock: CustomBlock | undefined;
    try {
      customBlock = await getRouteBlock(path);
    } catch (error: any) {
      return;
    }
    if (!exitsCustomBlock && !customBlock) return;

    if (!customBlock) {
      customBlockMap.delete(path);
      return;
    }
    if (!exitsCustomBlock || !dequal(exitsCustomBlock, customBlock)) {
      customBlockMap.set(path, customBlock);
      ctx.onUpdate();
    }
  }

  return {
    resolveExtensions() {
      return ['tsx', 'jsx', 'ts', 'js'];
    },
    async resolveRoutes(ctx) {
      return resolveReactRoutes(ctx, customBlockMap);
    },
    async getComputedRoutes(ctx) {
      return computeReactRoutes(ctx, customBlockMap);
    },
    stringify: {
      component: (path) => `React.createElement(${path})`,
      dynamicImport: (path) => `React.lazy(() => import("${path}"))`,
      final: (code) => `import React from "react";\n${code}`,
    },
    hmr: {
      added: async (ctx, path) => checkCustomBlockChange(ctx, path),
      changed: async (ctx, path) => checkCustomBlockChange(ctx, path),
      removed: async (_ctx, path) => {
        customBlockMap.delete(path);
      },
    },
  };
}
