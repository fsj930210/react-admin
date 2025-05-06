/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { LRUCache } from 'lru-cache';
import { v4 as uuidv4 } from 'uuid';

import { defaults as defaultConfig } from './defaults';
import { handleRaceCondition } from './race';
import { retryRequest } from './retry';
import { serializeParams } from './utils';

import type { CreateRequestDefaults, RequestConfig } from './types';
import type {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  Axios,
} from 'axios';

class Request {
  protected axiosInstance: AxiosInstance;
  protected requestPoolMap = new Map<string, Promise<AxiosResponse>>();
  protected cacheInstance: LRUCache<string, AxiosResponse>;
  protected raceControllers = new Map<string, AbortController>();
  protected globalAbortController = new AbortController();
  protected instanceDefaults: CreateRequestDefaults;
  public interceptors: Axios['interceptors'];
  constructor(config?: CreateRequestDefaults) {
    const mergedConfig = { ...defaultConfig, ...config };
    const {
      requestPool,
      cache,
      retry,
      retryCount,
      retryDelay,
      raceStrategy,
      lruOptions,
      swr,
      customCacheStrategy,
      ...restConfig
    } = mergedConfig;

    this.axiosInstance = axios.create({ ...restConfig });
    this.cacheInstance = new LRUCache<string, AxiosResponse>(
      lruOptions as LRUCache.Options<string, AxiosResponse<any, any>, unknown>,
    );
    this.instanceDefaults = mergedConfig;
    this.interceptors = {
      request: this.axiosInstance.interceptors.request,
      response: this.axiosInstance.interceptors.response,
    };
  }

  get defaults() {
    return this.instanceDefaults;
  }

  getUri(config?: AxiosRequestConfig) {
    return this.axiosInstance.getUri(config);
  }

  async request<T = any, R = AxiosResponse<T>, D = any>(
    configOrUrl: string | RequestConfig<D>,
    config: RequestConfig<D>,
  ): Promise<R> {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    const { headers, ...restConfig } = this.instanceDefaults;
    const mergedConfig: RequestConfig = {
      ...restConfig,
      ...config,
    };
    const { requestPool, cache, retry, swr } = mergedConfig;

    const cacheKey = serializeParams(mergedConfig);
    let raceKey = mergedConfig.raceKey;
    if (!raceKey) {
      const uniqueId = uuidv4();
      raceKey = `${cacheKey}-${uniqueId}`;
    }

    // 去重请求
    if (requestPool && this.requestPoolMap.has(cacheKey)) {
      return this.requestPoolMap.get(cacheKey)! as Promise<R>;
    }

    // 缓存与 SWR
    let cachedResponse: R | null = null;
    if (cache) {
      cachedResponse = (this.cacheInstance.get(cacheKey) as R) || null;
      if (mergedConfig.customCacheStrategy) {
        cachedResponse = mergedConfig.customCacheStrategy(
          this.cacheInstance,
          cacheKey,
          cachedResponse,
        );
      }
    }

    if (cachedResponse && swr) {
      // 立即返回缓存数据，并在后台重新验证
      void this.axiosInstance
        .request<T, R, D>(mergedConfig)
        .then((newResponse) => {
          if (mergedConfig.customCacheStrategy) {
            mergedConfig.customCacheStrategy(
              this.cacheInstance,
              cacheKey,
              newResponse,
            );
          } else {
            this.cacheInstance.set(cacheKey, newResponse as AxiosResponse);
          }
        })
        .catch((error) => {
          console.error('Error revalidating data:', error);
        })
        .finally(() => {
          this.requestPoolMap.delete(cacheKey);
          this.raceControllers.delete(raceKey);
        });
      return cachedResponse;
    }

    // 竞态管理
    if (
      !handleRaceCondition(
        mergedConfig,
        this.raceControllers,
        this.instanceDefaults.raceStrategy,
      )
    ) {
      return Promise.reject(new Error('Request ignored due to race condition'));
    }

    const requestPromise = this.axiosInstance
      .request({
        ...mergedConfig,
      })
      .catch((error) => {
        if (retry) {
          const retryCount =
            mergedConfig.retryCount || this.instanceDefaults.retryCount || 1;
          const retryDelay =
            mergedConfig.retryDelay || this.instanceDefaults.retryDelay || 2000;
          return retryRequest(
            this.axiosInstance,
            mergedConfig,
            error,
            retryCount,
            retryDelay,
          );
        }
        throw error;
      })
      .finally(() => {
        this.requestPoolMap.delete(cacheKey);
        this.raceControllers.delete(raceKey);
      });

    if (requestPool) {
      this.requestPoolMap.set(cacheKey, requestPromise);
    }

    if (cache) {
      requestPromise.then((response) => {
        if (mergedConfig.customCacheStrategy) {
          mergedConfig.customCacheStrategy(
            this.cacheInstance,
            cacheKey,
            response,
          );
        } else {
          this.cacheInstance.set(cacheKey, response);
        }
      });
    }

    return requestPromise as Promise<R>;
  }
  get(url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'get', url });
  }

  delete(url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'delete', url });
  }

  head(url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'head', url });
  }

  options(url: string, config?: RequestConfig): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'options', url });
  }

  post(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'post', url, data });
  }

  put(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'put', url, data });
  }

  patch(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<AxiosResponse> {
    return this.request(url, { ...config, method: 'patch', url, data });
  }

  cancelAllRequests() {
    this.globalAbortController.abort();
  }
}

export default Request;
