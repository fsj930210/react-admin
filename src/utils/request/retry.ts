import type { RequestConfig } from './types';
import type { AxiosInstance, AxiosResponse } from 'axios';

async function invoke(
  request: AxiosInstance,
  config: RequestConfig,
  retryDelay: number,
) {
  await new Promise((resolve) => setTimeout(resolve, retryDelay));
  const res = await request({ ...config });
  return res;
}
// 重试机制
export async function retryRequest<T = any, D = any>(
  request: AxiosInstance,
  config: RequestConfig,
  error: any,
  retryCount: number,
  retryDelay: number,
): Promise<AxiosResponse<T, D>> {
  if (retryCount <= 0) {
    throw error;
  }
  for (let i = retryCount; i > 0; i--) {
    try {
      const res = await invoke(request, config, retryDelay);
      return res;
    } catch (error) {
      console.log('retryRequest error', error);
      continue;
    }
  }
  throw error;
}
