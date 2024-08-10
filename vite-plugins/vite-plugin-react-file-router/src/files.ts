import { join } from 'node:path';

import { slash } from '@antfu/utils';
import fg from 'fast-glob';

import { extsToGlob } from './utils';

import type { PageOptions, ResolvedOptions } from './types';

/**
 * Resolves the page dirs for its for its given globs
 */
export function getPageDirs(
  PageOptions: PageOptions,
  root: string,
  exclude: string[],
): PageOptions[] {
  const dirs = fg.sync(slash(PageOptions.dir), {
    ignore: exclude,
    onlyDirectories: true,
    dot: true,
    unique: true,
    cwd: root,
  });

  const pageDirs = dirs.map((dir) => ({
    ...PageOptions,
    dir,
  }));

  return pageDirs;
}

/**
 * Resolves the files that are valid pages for the given context.
 */
export function getPageFiles(
  path: string,
  options: ResolvedOptions,
  pageOptions?: PageOptions,
): string[] {
  const { exclude, extensions } = options;

  const ext = extsToGlob(extensions);
  const pattern = pageOptions?.filePattern ?? `**/*.${ext}`;

  const files = fg
    .sync(pattern, {
      ignore: exclude,
      onlyFiles: true,
      cwd: path,
    })
    .map((p) => slash(join(path, p)));

  return files;
}

/**
 * Resolves the layout files that are valid pages for the given context.
 */
export function getLayoutFiles(
  path: string,
  options: ResolvedOptions,
): string[] {
  const { exclude } = options;
  //  直接取exclude的最后一个元素是因为我们会把layout的规则加入到exclude里面的最后一个
  const pattern = exclude[exclude.length - 1];

  const files = fg
    .sync(pattern, {
      onlyFiles: true,
      cwd: path,
    })
    .map((p) => slash(join(path, p)));

  return files;
}
