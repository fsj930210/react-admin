import type { CSSProperties, ReactNode, ReactElement, Ref } from 'react';

export interface KeepAliveProps {
  children: ReactElement | null;
  cachedKey?: string;
  style?: CSSProperties;
  className?: string;
  includes?: string | RegExp | (string | RegExp)[];
  excludes?: string | RegExp | (string | RegExp)[];
  saveScrollPosition?: boolean;
  keepRoutes?: boolean;
  refreshFallback?: React.ReactNode;
  refreshInterval?: number;
  ref?: Ref<KeepAliveRef>;
}
export type ActivityMode = 'visible' | 'hidden';

export interface ActivityProps {
  mode: ActivityMode;
  children: ReactNode;
}
export type NodePosition = { x: number; y: number };
export type ScrollNodesPosition = [
  Element,
  {
    x: number;
    y: number;
  },
];

export type CachedComponent = {
  key: string;
  component: ReactNode;
  cachedScrollNodes?: ScrollNodesPosition[];
  element?: HTMLDivElement | null;
  refreshKey?: string;
  refreshing?: boolean;
  el: HTMLDivElement;
};

export type ExcludeComponent = {
  key: string;
  component: ReactNode;
  refreshKey?: string;
};

export type KeepAliveRef = {
  onClearCache: () => void;
  onRefreshCache: (key: string) => void;
  onRemoveCache: (key: string) => void;
  onRemoveCacheByKeys: (keys: string[]) => void;
};
