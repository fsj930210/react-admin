import { createContext } from 'react';

import type { CachedComponent } from './interface';

export const KeepAliveContext = createContext<Map<string, CachedComponent>>(
  new Map(),
);
