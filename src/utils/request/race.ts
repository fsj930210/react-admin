import { v4 as uuidv4 } from 'uuid';

import { serializeParams } from './utils';

import type { RequestConfig } from './types';

// 竞态管理
export function handleRaceCondition(
  config: RequestConfig,
  raceControllers: Map<string, AbortController>,
  raceStrategy?: 'cancel-last' | 'cancel-previous' | 'ignore',
) {
  let key = config.raceKey;
  if (!key) {
    const uniqueId = uuidv4();
    const baseKey = serializeParams(config);
    key = `${baseKey}-${uniqueId}`;
  }
  const strategy = config.raceStrategy || raceStrategy || 'cancel-last';
  if (raceControllers.has(key)) {
    const controller = raceControllers.get(key)!;
    if (strategy === 'cancel-last') {
      config.signal = AbortSignal.timeout(0);
    } else if (strategy === 'cancel-previous') {
      controller.abort();
    } else if (strategy === 'ignore') {
      return false;
    }
  }
  const newController = new AbortController();
  raceControllers.set(key, newController);
  config.signal = newController.signal;
  return true;
}
