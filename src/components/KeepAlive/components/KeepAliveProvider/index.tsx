import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { KeepAliveContext } from '../../KeepAliveContext';

import type { CachedComponent } from '../../interface';

type KeepAliveProviderProps = {
  children: ReactNode;
};
const KeepAliveProvider = ({ children }: KeepAliveProviderProps) => {
  const [cachedComponents, setCachedComponents] = useState<CachedComponent[]>(
    [],
  );
  const cachedComponentsRef = useRef<CachedComponent[]>([]);
  const onRefreshCache = (key: string) => {
    setCachedComponents((prev) => {
      const newCachedComponents = [...prev];
      const index = cachedComponents.findIndex((item) => item.key === key);
      if (index > -1) {
        newCachedComponents[index].refreshKey = uuidv4();
      }
      cachedComponentsRef.current = newCachedComponents;
      return newCachedComponents;
    });
  };
  const onClearCache = () => {
    cachedComponentsRef.current = [];
    setCachedComponents([]);
  };
  const onRemoveCache = (key: string) => {
    setCachedComponents((prev) => {
      const newCachedComponents = [...prev];
      const index = cachedComponents.findIndex((item) => item.key === key);
      if (index > -1) {
        newCachedComponents.splice(index, 1);
      }
      cachedComponentsRef.current = newCachedComponents;
      return newCachedComponents;
    });
  };
  const onRemoveOtherCache = (key: string) => {
    setCachedComponents((prev) => {
      const newCachedComponents = prev.filter((item) => item.key === key);
      cachedComponentsRef.current = newCachedComponents;
      return newCachedComponents;
    });
  };
  const onRemoveCacheByKeys = (keys: string[]) => {
    setCachedComponents((prev) => {
      const newCachedComponents = prev.filter(
        (item) => !keys.includes(item.key),
      );
      cachedComponentsRef.current = newCachedComponents;
      return newCachedComponents;
    });
  };
  return (
    <KeepAliveContext.Provider
      value={{
        cachedComponents,
        cachedComponentsRef: cachedComponentsRef,
        setCachedComponents,
        onClearCache,
        onRefreshCache,
        onRemoveCache,
        onRemoveCacheByKeys,
        onRemoveOtherCache,
      }}
    >
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAliveProvider;
