import stringify from 'json-stable-stringify';

import type { AxiosRequestConfig } from 'axios';

// 参数序列化方法
export function serializeParams(config: AxiosRequestConfig): string {
  if (config.data instanceof FormData) {
    return `FormData:${config.url}:${config.method}:${Array.from(config.data).length}`;
  }
  if (config.data instanceof Blob) {
    return `Blob:${config.url}:${config.method}:${config.data.size}`;
  }
  if (config.data instanceof ArrayBuffer) {
    return `ArrayBuffer:${config.url}:${config.method}:${config.data.byteLength}`;
  }
  const basicObj: AxiosRequestConfig = {
    url: config.url,
    method: config.method,
  };
  if (config.params) {
    basicObj.params = config.params;
  }
  if (config.data) {
    basicObj.data = config.data;
  }
  return stringify(basicObj) as string;
}
