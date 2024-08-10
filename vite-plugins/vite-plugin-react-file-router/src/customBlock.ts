import fs from 'node:fs';

// @ts-expect-error no type
import extractComments from 'extract-comments';
import { parse as YAMLParser } from 'yaml';

import type { CustomBlock, ParsedJSX } from './types';

const routeJSXReg = /^\s+(route)\s+/gm;

export function parseJSX(code: string): ParsedJSX[] {
  return extractComments(code)
    .slice(0, 1)
    .filter(
      (comment: ParsedJSX) =>
        routeJSXReg.test(comment.value) &&
        comment.value.includes(':') &&
        comment.loc.start.line === 1,
    );
}

export function parseYamlComment(code: ParsedJSX[], path: string): CustomBlock {
  return code.reduce((memo, item) => {
    const { value } = item;
    const v = value.replace(routeJSXReg, '');
    try {
      const yamlResult = YAMLParser(v);

      return {
        ...memo,
        ...yamlResult,
      };
    } catch (err: any) {
      throw new Error(
        `Invalid YAML format of comment in ${path}\n${err.message}`,
      );
    }
  }, {});
}

export async function getRouteBlock(path: string) {
  const content = fs.readFileSync(path, 'utf8');

  const parsedJSX = parseJSX(content);

  if (parsedJSX.length === 0) return;

  let result;

  if (parsedJSX.length > 0)
    result = parseYamlComment(parsedJSX, path) as CustomBlock;

  return result;
}
