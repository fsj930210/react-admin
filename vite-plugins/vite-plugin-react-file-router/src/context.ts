import { join, resolve } from 'node:path';
import process from 'node:process';

import { slash, toArray } from '@antfu/utils';

import { getLayoutFiles, getPageFiles } from './files';
import { resolveOptions } from './options';
import { invalidatePagesModule, isLayout, isTarget } from './utils';

import type { PageOptions, ResolvedOptions, UserOptions } from './types';
import type { ViteDevServer } from 'vite';

export interface PageRoute {
  path: string;
  route: string;
}

export class PageContext {
  private _server: ViteDevServer | undefined;
  private _pageRouteMap = new Map<string, PageRoute>();
  private _layoutRouteMap = new Map<string, PageRoute>();
  rawOptions: UserOptions;
  root: string;
  options: ResolvedOptions;

  constructor(userOptions: UserOptions, viteRoot: string = process.cwd()) {
    this.rawOptions = userOptions;
    this.root = slash(viteRoot);
    this.options = resolveOptions(userOptions, this.root);
  }

  setupViteServer(server: ViteDevServer) {
    if (this._server === server) return;

    this._server = server;
    this.setupWatcher(server.watcher);
  }

  setupWatcher(watcher: ViteDevServer['watcher']) {
    watcher.on('unlink', async (path) => {
      path = slash(path);
      if (!isTarget(path, this.options)) return;
      await this.removePage(path);
      this.onUpdate();
    });
    watcher.on('add', async (path) => {
      path = slash(path);
      if (!isTarget(path, this.options)) return;
      const page = this.options.dirs.find((i) =>
        path.startsWith(slash(resolve(this.root, i.dir))),
      )!;
      // 新增文件时不知道可以是路由也可以是layout
      await this.addPage(path, page, path);
      this.onUpdate();
    });

    watcher.on('change', async (path) => {
      path = slash(path);
      if (!isTarget(path, this.options)) return;
      const page = this._pageRouteMap.get(path);
      if (page) await this.options.resolver.hmr?.changed?.(this, path);
    });
  }

  async addPage(
    path: string | string[],
    pageDir: PageOptions,
    layoutPath: string | string[],
  ) {
    const pageDirPath = slash(resolve(this.root, pageDir.dir));
    const layoutPathArray = toArray(layoutPath);
    const pathArray = toArray(path);
    for (const p of pathArray) {
      const extension = this.options.extensions.find((ext) =>
        p.endsWith(`.${ext}`),
      );
      if (!extension) continue;
      const route = slash(
        join(
          pageDir.baseRoute,
          p.replace(`${pageDirPath}/`, '').replace(`.${extension}`, ''),
        ),
      );
      if (!isLayout(p, this.options)) {
        this._pageRouteMap.set(p, {
          path: p,
          route,
        });
        await this.options.resolver.hmr?.added?.(this, p);
      }
    }
    for (const p of layoutPathArray) {
      const extension = this.options.extensions.find((ext) =>
        p.endsWith(`.${ext}`),
      );
      if (!extension) continue;
      const route = slash(
        join(
          pageDir.baseRoute,
          p.replace(`${pageDirPath}/`, '').replace(`.${extension}`, ''),
        ),
      );
      this._layoutRouteMap.set(p, {
        path: p,
        route,
      });
      await this.options.resolver.hmr?.added?.(this, p);
    }
  }

  async removePage(path: string) {
    this._pageRouteMap.delete(path);
    this._layoutRouteMap.delete(path);
    await this.options.resolver.hmr?.removed?.(this, path);
  }

  onUpdate() {
    if (!this._server) return;

    invalidatePagesModule(this._server);
    this._server.ws.send({
      type: 'full-reload',
    });
  }

  async resolveRoutes() {
    return this.options.resolver.resolveRoutes(this);
  }

  async init() {
    const pageDirFiles = this.options.dirs.map((page) => {
      const pagesDirPath = slash(resolve(this.options.root, page.dir));
      const files = getPageFiles(pagesDirPath, this.options, page);
      // 这里拿到所有的layout的路径
      const layoutFiles = getLayoutFiles(pagesDirPath, this.options);
      const resolvedLayoutFiles = layoutFiles.map((file) => slash(file));
      const resolvedFiles = files.map((file) => slash(file));
      const allFiles = [...resolvedFiles, ...resolvedLayoutFiles];
      return {
        ...page,
        files: allFiles,
        layoutFiles: resolvedLayoutFiles,
      };
    });

    for (const page of pageDirFiles)
      await this.addPage(page.files, page, page.layoutFiles);
  }

  get pageRouteMap() {
    return this._pageRouteMap;
  }
  get layoutRouteMap() {
    return this._layoutRouteMap;
  }
}
