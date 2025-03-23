import { createContext } from 'react';

type LayoutTabsContextValue = {
  onClearCache?: (() => void) | undefined;
  onRefreshCache?: ((key: string) => void) | undefined;
  onRemoveCache?: ((key: string) => void) | undefined;
  onRemoveCacheByKeys?: ((keys: string[]) => void) | undefined;
  refresh?: () => void;
};
export const LayoutTabsContext = createContext<LayoutTabsContextValue>({});
