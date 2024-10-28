import { createContext } from 'react';

import type { KeepAliveContextValue } from './interface';
export const defaultKeepAliveContextValue: KeepAliveContextValue = {
  onClearCache: () => {},
  onRefreshCache: () => {},
  onRemoveCache: () => {},
  onRemoveCacheByKeys: () => {},
  onRemoveOtherCache: () => {},
  setCachedComponents: () => {},
  cachedComponents: [],
  cachedComponentsRef: null,
};
export const KeepAliveContext = createContext<KeepAliveContextValue>(
  defaultKeepAliveContextValue,
);
