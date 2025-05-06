import axios from 'axios';

import type { ExtendedConfig } from './types';

// 默认全局配置
export const defaultGlobalConfig: ExtendedConfig = {
  requestPool: true,
  cache: true,
  retry: false,
  retryCount: 3,
  retryDelay: 1000,
  raceStrategy: 'cancel-previous',
  lruOptions: { max: 100 },
  swr: true,
  customCacheStrategy: undefined,
};

// 全局默认配置
export const defaults: ExtendedConfig & typeof axios.defaults = {
  ...defaultGlobalConfig,
  ...axios.defaults,
};
