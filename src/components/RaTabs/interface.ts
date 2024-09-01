import type React from 'react';

import { DropdownProps } from 'antd';

import type { TabNavListProps } from './TabNavList';
import type { TabPaneProps } from './TabPanelList/TabPane';
import type { CSSMotionProps } from 'rc-motion';

export type TriggerProps = {
  trigger?: 'hover' | 'click';
};
export type moreIcon = React.ReactNode;
export type MoreProps = {
  icon?: moreIcon;
} & Omit<DropdownProps, 'children'>;

export type SizeInfo = [width: number, height: number];

export type TabSizeMap = Map<
  React.Key,
  { width: number; height: number; left: number; top: number }
>;

export interface TabOffset {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
}

export type TabOffsetMap = Map<React.Key, TabOffset>;

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}

export type RenderTabBarProps = {
  id?: string;
  activeKey: string;
  animated?: AnimatedConfig;
  tabPosition: TabPosition;
  rtl: boolean;
  mobile: boolean;
  editable?: EditableConfig;
  locale?: TabsLocale;
  more?: MoreProps;
  tabBarGutter?: number;
  onTabClick: (
    key: string,
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
  ) => void;
  onTabScroll?: OnTabScroll;
  extra?: TabBarExtraContent;
  style?: React.CSSProperties;
};

export type RenderTabBar = (
  props: RenderTabBarProps,
  DefaultTabBar: React.ComponentType<TabNavListProps>,
) => React.ReactElement;

export interface TabsLocale {
  dropdownAriaLabel?: string;
  removeAriaLabel?: string;
  addAriaLabel?: string;
}

export interface EditableConfig {
  onEdit: (
    type: 'add' | 'remove',
    info: { key?: string; event: React.MouseEvent | React.KeyboardEvent },
  ) => void;
  showAdd?: boolean;
  removeIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
}

export interface AnimatedConfig {
  inkBar?: boolean;
  tabPane?: boolean;
  tabPaneMotion?: CSSMotionProps;
}

export type OnTabScroll = (info: {
  direction: 'left' | 'right' | 'top' | 'bottom';
}) => void;

export type TabBarExtraPosition = 'left' | 'right';

export type TabBarExtraMap = Partial<
  Record<TabBarExtraPosition, React.ReactNode>
>;

export type TabBarExtraContent = React.ReactNode | TabBarExtraMap;

export type TabBarScrollButtonPosition = TabBarExtraPosition;
export type TabBarScrollButtonMap = Partial<
  Record<TabBarScrollButtonPosition, React.ReactNode>
>;
export type TabBarScrollButtonContent = React.ReactNode | TabBarScrollButtonMap;