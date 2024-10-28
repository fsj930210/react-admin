import type {
  CSSProperties,
  ReactNode,
  ReactElement,
  SetStateAction,
  Dispatch,
  MutableRefObject,
} from 'react';

interface KeepAliveCommonProps {
  children: ReactElement | null;
  cachedKey?: string;
  style?: CSSProperties;
  className?: string;
  saveScrollPosition?: boolean;
}

export type KeepAliveProps = KeepAliveCommonProps;
export interface KeepAliveRouteProps extends KeepAliveCommonProps {
  includes?: string | RegExp | (string | RegExp)[];
  excludes?: string | RegExp | (string | RegExp)[];
  saveScrollPosition?: boolean;
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
};

export type ExcludeComponent = {
  key: string;
  component: ReactNode;
  refreshKey?: string;
};
export type KeepAliveContextValue = {
  cachedComponents: CachedComponent[];
  cachedComponentsRef: MutableRefObject<CachedComponent[]> | null;
  setCachedComponents: Dispatch<SetStateAction<CachedComponent[]>>;
  onClearCache: () => void;
  onRemoveCache: (key: string) => void;
  onRefreshCache: (key: string) => void;
  onRemoveCacheByKeys: (keys: string[]) => void;
  onRemoveOtherCache: (key: string) => void;
};
