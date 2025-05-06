import { createContext } from 'react';
import type { RefObject } from 'react';

import type { KeepAliveRef } from '@/components/RaKeepAlive/interface';

type LayoutTabsContextValue = {
  // onClearCache?: (() => void) | undefined;
  // onRefreshCache?: ((key: string) => void) | undefined;
  // onRemoveCache?: ((key: string) => void) | undefined;
  // onRemoveCacheByKeys?: ((keys: string[]) => void) | undefined;
  // refresh?: () => void;
  keepAliveRef?: RefObject<KeepAliveRef | null>;
  refresh?: () => void;
};
export const LayoutTabsContext = createContext<LayoutTabsContextValue>({
  keepAliveRef: {
    current: null,
  },
});
