import { resolve } from 'node:path';
import process from 'node:process';

import { slash, toArray } from '@antfu/utils';

import { getPageDirs } from './files';
import { reactResolver } from './resolvers/react';

import type { ImportModeResolver, ResolvedOptions, UserOptions } from './types';

function resolvePageDirs(
  dirs: UserOptions['dirs'],
  root: string,
  exclude: string[],
) {
  dirs = toArray(dirs);
  return dirs.flatMap((dir) => {
    const option = typeof dir === 'string' ? { dir, baseRoute: '' } : dir;

    option.dir = slash(resolve(root, option.dir)).replace(`${root}/`, '');
    option.baseRoute = option.baseRoute.replace(/^\//, '').replace(/\/$/, '');

    return getPageDirs(option, root, exclude);
  });
}

export const syncIndexResolver: ImportModeResolver = (filepath, options) => {
  for (const page of options.dirs) {
    if (page.baseRoute === '' && filepath.startsWith(`/${page.dir}/index`))
      return 'sync';
  }
  return 'async';
};

function getResolver(originalResolver: UserOptions['resolver']) {
  let resolver = originalResolver || 'react';

  if (typeof resolver !== 'string') return resolver;
  resolver = reactResolver();
  return resolver;
}

export function resolveOptions(
  userOptions: UserOptions,
  viteRoot?: string,
): ResolvedOptions {
  const {
    dirs = userOptions.dirs || ['src/pages'],
    // 默认排除components目录下的文件作为路由
    exclude = ['node_modules', '.git', '**/__*__/**', '**/components/**'],
    caseSensitive = false,
    // 默认布局组件名为Layout
    layoutComponentName = 'Layout',
    excludeRoutesFromRootRoute = [],
    useIndexAsRoot = false,
    extendRoute,
    onRoutesGenerated,
    onClientGenerated,
  } = userOptions;

  const root = viteRoot || slash(process.cwd());

  const importMode = userOptions.importMode || 'async';

  const importPath = userOptions.importPath || 'relative';

  const resolver = getResolver(userOptions.resolver);

  const extensions = userOptions.extensions || resolver.resolveExtensions();

  const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`);

  const routeStyle = userOptions.routeStyle || 'next';
  // 将布局组件加入exclude
  const resolvedExclude = exclude.concat(
    `**/${layoutComponentName}.{${extensions.join(',')}}`,
  );
  const resolvedDirs = resolvePageDirs(dirs, root, resolvedExclude);
  const resolvedOptions: ResolvedOptions = {
    dirs: resolvedDirs,
    routeStyle,
    root,
    extensions,
    importMode,
    importPath,
    exclude: resolvedExclude,
    useIndexAsRoot,
    excludeRoutesFromRootRoute,
    layoutComponentName,
    caseSensitive,
    resolver,
    extensionsRE,
    extendRoute,
    onRoutesGenerated,
    onClientGenerated,
  };

  return resolvedOptions;
}
