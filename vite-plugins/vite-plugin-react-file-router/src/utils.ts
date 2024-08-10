import { resolve, win32 } from 'node:path';
import { URLSearchParams } from 'node:url';

import { slash } from '@antfu/utils';

import {
  VIRTUAL_MODULE_ID,
  cacheAllRouteRE,
  countSlashRE,
  dynamicRouteRE,
  nuxtCacheAllRouteRE,
  nuxtDynamicRouteRE,
  replaceDynamicRouteRE,
  replaceIndexRE,
} from './constants';

import type { ResolvedOptions } from './types';
import type { ModuleNode, ViteDevServer } from 'vite';

export function extsToGlob(extensions: string[]) {
  return extensions.length > 1
    ? `{${extensions.join(',')}}`
    : extensions[0] || '';
}

export function countSlash(value: string) {
  return (value.match(countSlashRE) || []).length;
}

function isPagesDir(path: string, options: ResolvedOptions) {
  for (const page of options.dirs) {
    const dirPath = slash(resolve(options.root, page.dir));
    if (path.startsWith(dirPath)) return true;
  }
  return false;
}

export function isTarget(path: string, options: ResolvedOptions) {
  return isPagesDir(path, options) && options.extensionsRE.test(path);
}

export function isDynamicRoute(routePath: string, nuxtStyle = false) {
  return nuxtStyle
    ? nuxtDynamicRouteRE.test(routePath)
    : dynamicRouteRE.test(routePath);
}

export function isCatchAllRoute(routePath: string, nuxtStyle = false) {
  return nuxtStyle
    ? nuxtCacheAllRouteRE.test(routePath)
    : cacheAllRouteRE.test(routePath);
}

export function resolveImportMode(filepath: string, options: ResolvedOptions) {
  const mode = options.importMode;
  if (typeof mode === 'function') return mode(filepath, options);
  return mode;
}

export function invalidatePagesModule(server: ViteDevServer) {
  const { moduleGraph } = server;
  const mods = moduleGraph.getModulesByFile(VIRTUAL_MODULE_ID);
  if (mods) {
    const seen = new Set<ModuleNode>();
    mods.forEach((mod) => {
      moduleGraph.invalidateModule(mod, seen);
    });
  }
}

export function normalizeCase(str: string, caseSensitive: boolean) {
  if (!caseSensitive) return str.toLocaleLowerCase();
  return str;
}

export function normalizeName(
  name: string,
  isDynamic: boolean,
  nuxtStyle = false,
) {
  if (!isDynamic) return name;

  return nuxtStyle
    ? name.replace(nuxtDynamicRouteRE, '$1') || 'all'
    : name.replace(replaceDynamicRouteRE, '$1');
}

export function buildReactRoutePath(
  node: string,
  nuxtStyle = false,
): string | undefined {
  const isDynamic = isDynamicRoute(node, nuxtStyle);
  const isCatchAll = isCatchAllRoute(node, nuxtStyle);
  const normalizedName = normalizeName(node, isDynamic, nuxtStyle);

  if (isDynamic) {
    if (isCatchAll) return '*';

    return `:${normalizedName}`;
  }

  return `${normalizedName}`;
}

// https://github.dev/remix-run/remix/blob/264e3f8884c5cafd8d06acc3e01153b376745b7c/packages/remix-dev/config/routesConvention.ts#L105
export function buildReactRemixRoutePath(node: string): string | undefined {
  const escapeStart = '[';
  const escapeEnd = ']';
  let result = '';
  let rawSegmentBuffer = '';

  let inEscapeSequence = 0;
  let skipSegment = false;
  for (let i = 0; i < node.length; i++) {
    const char = node.charAt(i);
    const lastChar = i > 0 ? node.charAt(i - 1) : undefined;
    const nextChar = i < node.length - 1 ? node.charAt(i + 1) : undefined;

    function isNewEscapeSequence() {
      return (
        !inEscapeSequence && char === escapeStart && lastChar !== escapeStart
      );
    }

    function isCloseEscapeSequence() {
      return inEscapeSequence && char === escapeEnd && nextChar !== escapeEnd;
    }

    function isStartOfLayoutSegment() {
      return char === '_' && nextChar === '_' && !rawSegmentBuffer;
    }

    if (skipSegment) {
      if (char === '/' || char === '.' || char === win32.sep)
        skipSegment = false;

      continue;
    }

    if (isNewEscapeSequence()) {
      inEscapeSequence++;
      continue;
    }

    if (isCloseEscapeSequence()) {
      inEscapeSequence--;
      continue;
    }

    if (inEscapeSequence) {
      result += char;
      continue;
    }

    if (char === '/' || char === win32.sep || char === '.') {
      if (rawSegmentBuffer === 'index' && result.endsWith('index'))
        result = result.replace(replaceIndexRE, '');
      else result += '/';

      rawSegmentBuffer = '';
      continue;
    }

    if (isStartOfLayoutSegment()) {
      skipSegment = true;
      continue;
    }

    rawSegmentBuffer += char;

    if (char === '$') {
      result += typeof nextChar === 'undefined' ? '*' : ':';
      continue;
    }

    result += char;
  }

  if (rawSegmentBuffer === 'index' && result.endsWith('index'))
    result = result.replace(replaceIndexRE, '');

  return result || undefined;
}

export function parsePageRequest(id: string) {
  const [moduleId, rawQuery] = id.split('?', 2);
  const query = new URLSearchParams(rawQuery);
  const pageId = query.get('id');
  return {
    moduleId,
    query,
    pageId,
  };
}

export function getParentPath(path: string) {
  const pathArray = path.split('/');
  pathArray.splice(pathArray.length - 1, 1);
  return pathArray.join('/');
}

export function isLayout(path: string, options: ResolvedOptions) {
  const extension = options.extensions.find((ext) => path.endsWith(`.${ext}`));
  return path.endsWith(`${options.layoutComponentName}${extension}`);
}
