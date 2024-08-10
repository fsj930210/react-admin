import type { PageContext } from './context';
import type { ReactRoute } from './resolvers/react';
import type { Awaitable } from '@antfu/utils';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ImportMode = 'sync' | 'async';
export type ImportModeResolver = (
  filepath: string,
  pluginOptions: ResolvedOptions,
) => ImportMode;

export interface ParsedJSX {
  value: string;
  loc: {
    start: {
      line: number;
    };
  };
}

export type CustomBlock = Record<string, any>;

export type InternalPageResolvers = 'react';

export interface PageOptions {
  /**
   * Page base directory.
   * @default 'src/pages'
   */
  dir: string;
  /**
   * Page base route.
   */
  baseRoute: string;
  /**
   * Page file pattern.
   * @example `**\/*.page.tsx`
   */
  filePattern?: string;
}

export interface PageResolver {
  resolveExtensions: () => string[];
  resolveRoutes: (ctx: PageContext) => Awaitable<string>;
  getComputedRoutes: (ctx: PageContext) => Awaitable<ReactRoute[]>;
  stringify?: {
    dynamicImport?: (importPath: string) => string;
    component?: (importName: string) => string;
    final?: (code: string) => string;
  };
  hmr?: {
    added?: (ctx: PageContext, path: string) => Awaitable<void>;
    removed?: (ctx: PageContext, path: string) => Awaitable<void>;
    changed?: (ctx: PageContext, path: string) => Awaitable<void>;
  };
}

/**
 * Plugin options.
 */
interface Options {
  /**
   * Paths to the directory to search for page components.
   * @default 'src/pages'
   */
  dirs: string | (string | PageOptions)[];
  /**
   * Valid file extensions for page components.
   * @default ['tsx', 'jsx', 'ts', 'js']
   */
  extensions: string[];
  /**
   * List of path globs to exclude when resolving pages.
   */
  exclude: string[];
  /**
   * Import routes directly or as async components
   * @default 'root index file => "sync", others => "async"'
   */
  importMode: ImportMode | ImportModeResolver;
  /**
   * Import page components from absolute or relative paths.
   * @default 'relative'
   */
  importPath: 'absolute' | 'relative';
  /**
   * Routing style
   * @default false
   */
  routeStyle: 'next' | 'nuxt' | 'remix';
  /**
   * Case for route paths
   * @default false
   */
  caseSensitive: boolean;
  /**
   * Generate React Route
   * @default 'auto detect'
   */
  resolver: InternalPageResolvers | PageResolver;
  /**
   *  layout component name
   *  @default 'Layout''
   */
  layoutComponentName: string;
  /**
   * use pages/index.tsx as root route, so the route will be a tree
   * @default false
   */
  useIndexAsRoot: boolean;
  /**
   * list of routes to exclude when useIndexAsRoot is true
   */
  excludeRoutesFromRootRoute: string[];
  /**
   * Extend route records
   */
  extendRoute?: (route: any, parent: any | undefined) => any | void;
  /**
   * Custom generated routes
   */
  onRoutesGenerated?: (routes: any[]) => Awaitable<any[] | void>;
  /**
   * Custom generated client code
   */
  onClientGenerated?: (clientCode: string) => Awaitable<string | void>;
}

export type UserOptions = Partial<Options>;

export interface ResolvedOptions extends Options {
  /**
   * Resolves to the `root` value from Vite config.
   * @default config.root
   */
  root: string;
  /**
   * Resolved page dirs
   */
  dirs: PageOptions[];
  /**
   * Resolved page resolver
   */
  resolver: PageResolver;
  /**
   * RegExp to match extensions
   */
  extensionsRE: RegExp;
}
