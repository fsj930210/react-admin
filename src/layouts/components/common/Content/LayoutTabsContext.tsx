import { createContext } from 'react';
import type { RefObject } from 'react';

import type { KeepAliveRef } from '@/components/RaKeepAlive/interface';

type LayoutTabsContextValue = {
  keepAliveRef?: RefObject<KeepAliveRef | null>;
  refresh?: () => void;
};
export const LayoutTabsContext = createContext<LayoutTabsContextValue>({
  keepAliveRef: {
    current: null,
  },
});
