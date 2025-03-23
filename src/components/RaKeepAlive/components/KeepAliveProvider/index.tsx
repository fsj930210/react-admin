import { useRef } from 'react';
import type { ReactNode } from 'react';

import { KeepAliveContext } from '../../KeepAliveContext';

import type { CachedComponent } from '../../interface';

type KeepAliveProviderProps = {
  children: ReactNode;
};
const KeepAliveProvider = ({ children }: KeepAliveProviderProps) => {
  const globalCachedComponentsMapRef = useRef<Map<string, CachedComponent>>(
    new Map(),
  );

  return (
    <KeepAliveContext.Provider value={globalCachedComponentsMapRef.current}>
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAliveProvider;
