import { createContext } from 'react';

import type { KeepAliveContextValue } from './interface';
export const defaultKeepAliveContextValue: KeepAliveContextValue = {
  allCachedComponentsRef: null,
};
export const KeepAliveContext = createContext<KeepAliveContextValue>(
  defaultKeepAliveContextValue,
);
