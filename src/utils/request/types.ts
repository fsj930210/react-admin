import type Request from './Request';
import type {
  AxiosDefaults,
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  HeadersDefaults,
} from 'axios';
import type { LRUCache } from 'lru-cache';
export interface ExtendedConfig {
  requestPool?: boolean;
  cache?: boolean;
  retry?: boolean;
  retryCount?: number;
  retryDelay?: number;
  raceStrategy?: 'cancel-last' | 'cancel-previous' | 'ignore';
  lruOptions?: LRUCache.Options<string, AxiosResponse, unknown>;
  swr?: boolean;
  customCacheStrategy?: <T>(
    cache: LRUCache<string, AxiosResponse>,
    cacheKey: string,
    response: T | null,
  ) => T | null;
}

export type CreateRequestDefaults = CreateAxiosDefaults & ExtendedConfig;

// 扩展 Axios 请求配置接口
export type RequestConfig<D = any> = AxiosRequestConfig<D> &
  ExtendedConfig & {
    raceKey?: string;
  };

export type RequestDefaults = ExtendedConfig & AxiosDefaults;
export interface RequestInstance extends Request {
  <T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;

  create(config?: CreateAxiosDefaults): RequestInstance;
  defaults: Omit<RequestDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
}
