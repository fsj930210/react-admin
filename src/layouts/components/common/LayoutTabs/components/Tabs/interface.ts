import type { ReactNode } from 'react';

export interface TabItem {
  key: string;
  closable?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  label: ReactNode;
  title?: string;
  pinned?: boolean;
  iconName?: string; // 用于缓存时存储图标名称
}

export interface LayoutTabsProps {
  tabs: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  scrollStep?: number;
  className?: string;
  draggable?: boolean;
  onTabItemClick?: (key: string) => void;
  onTabItemClose?: (key: string) => void;
  children?: (
    node: React.ReactElement,
    props: Omit<TabNodeProps, 'customRenderTab'>,
    nodeKey: string,
    index: number,
  ) => React.ReactElement;
  extraContent?: ReactNode;
}

export type TabNodeProps = {
  tab: TabItem;
  active: boolean;
  index: number;
  onClick?: (key: string) => void;
  onClose?: (key: string, e: React.MouseEvent) => void;
  customRenderTab?: (
    node: React.ReactElement,
    props: Omit<TabNodeProps, 'customRenderTab'>,
    nodeKey: string,
    index: number,
  ) => React.ReactElement;
};
