import { useRef } from 'react';
import type { ReactNode } from 'react';

import { KeepAliveContext } from '../../KeepAliveContext';

import type { CachedComponent } from '../../interface';

type KeepAliveRootProps = {
  children: ReactNode;
};
const KeepAliveRoot = ({ children }: KeepAliveRootProps) => {
  const allCachedComponentsRef = useRef<CachedComponent[]>([]);

  return (
    <KeepAliveContext.Provider
      value={{
        allCachedComponentsRef,
      }}
    >
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAliveRoot;
