// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import React from 'react';
import { useEffect, useState } from 'react';

import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import isMobile from 'rc-util/lib/isMobile';

import useAnimateConfig from './hooks/useAnimateConfig';
import TabContext from './TabContext';
import TabNavListWrapper from './TabNavList/Wrapper';
import TabPanelList from './TabPanelList';

import type { GetIndicatorSize } from './hooks/useIndicator';
import type {
  AnimatedConfig,
  EditableConfig,
  MoreProps,
  OnTabScroll,
  RenderTabBar,
  Tab,
  TabBarExtraContent,
  TabPosition,
  TabsLocale,
} from './interface';
import './index.css';
import { DEFAULT_SCROLL_CONFIG, type ScrollConfig } from './config';

/**
 * Should added antd:
 * - type
 *
 */

// Used for accessibility
let uuid = 0;

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  items?: Tab[];
  activeKey?: string;
  defaultActiveKey?: string;
  direction?: 'ltr' | 'rtl';
  animated?: boolean | AnimatedConfig;
  tabBarExtraContent?: TabBarExtraContent;
  tabBarGutter?: number;
  tabBarStyle?: React.CSSProperties;
  tabPosition?: TabPosition;
  destroyInactiveTabPane?: boolean;
  editable?: EditableConfig;
  showInkBar?: boolean;
  hideAdd?: boolean;
  renderTabBar?: RenderTabBar;
  onChange?: (activeKey: string) => void;
  onTabClick?: (
    activeKey: string,
    e: React.KeyboardEvent | React.MouseEvent | React.FocusEvent,
  ) => void;

  onTabScroll?: OnTabScroll;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;

  // Accessibility
  locale?: TabsLocale;

  // Icons
  more?: MoreProps;
  /** @private Internal usage. Not promise will rename in future */
  popupClassName?: string;
  indicator?: {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
  };
  ref?: React.Ref<HTMLDivElement>;
  scrollConfig?: ScrollConfig;
}

const Tabs = (props: TabsProps) => {
  const {
    id,
    prefixCls = 'ra-tabs',
    className,
    items,
    direction,
    activeKey,
    defaultActiveKey,
    editable,
    animated,
    tabPosition = 'top',
    tabBarGutter,
    tabBarStyle,
    tabBarExtraContent,
    locale,
    more,
    destroyInactiveTabPane,
    renderTabBar,
    onChange,
    onTabClick,
    onTabScroll,
    getPopupContainer,
    popupClassName,
    indicator,
    showInkBar,
    hideAdd,
    ref,
    scrollConfig = DEFAULT_SCROLL_CONFIG,
    ...restProps
  } = props;
  const tabs = React.useMemo<Tab[]>(() => {
    return (items || []).filter(
      (item) => item && typeof item === 'object' && 'key' in item,
    );
  }, [items]);
  const rtl = direction === 'rtl';

  const mergedAnimated = useAnimateConfig(animated);

  // ======================== Mobile ========================
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    // Only update on the client side
    setMobile(isMobile());
  }, []);

  // ====================== Active Key ======================
  const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(
    () => tabs[0]?.key,
    {
      value: activeKey,
      defaultValue: defaultActiveKey,
    },
  );
  const [activeIndex, setActiveIndex] = useState(() =>
    tabs.findIndex((tab) => tab.key === mergedActiveKey),
  );

  // Reset active key if not exist anymore
  useEffect(() => {
    let newActiveIndex = tabs.findIndex((tab) => tab.key === mergedActiveKey);
    if (newActiveIndex === -1) {
      newActiveIndex = Math.max(0, Math.min(activeIndex, tabs.length - 1));
      setMergedActiveKey(tabs[newActiveIndex]?.key);
    }
    setActiveIndex(newActiveIndex);
  }, [tabs.map((tab) => tab.key).join('_'), mergedActiveKey, activeIndex]);

  // ===================== Accessibility ====================
  const [mergedId, setMergedId] = useMergedState(null, {
    value: id,
  });

  // Async generate id to avoid ssr mapping failed
  useEffect(() => {
    if (!id) {
      setMergedId(`rc-tabs-${process.env.NODE_ENV === 'test' ? 'test' : uuid}`);
      uuid += 1;
    }
  }, []);

  // ======================== Events ========================
  function onInternalTabClick(
    key: string,
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
  ) {
    // console.log('onInternalTabClick', key);
    onTabClick?.(key, e);
    const isActiveChanged = key !== mergedActiveKey;
    setMergedActiveKey(key);
    if (isActiveChanged) {
      onChange?.(key);
    }
  }

  // ======================== Render ========================
  const sharedProps = {
    id: mergedId || undefined,
    activeKey: mergedActiveKey,
    animated: mergedAnimated,
    tabPosition,
    rtl,
    mobile,
  };

  const tabNavBarProps = {
    ...sharedProps,
    scrollConfig,
    hideAdd,
    editable,
    locale,
    more,
    tabBarGutter,
    onTabClick: onInternalTabClick,
    onTabScroll,
    extra: tabBarExtraContent,
    style: tabBarStyle,
    panes: null,
    getPopupContainer,
    popupClassName,
    indicator,
    showInkBar,
  };
  return (
    <TabContext.Provider value={{ tabs, prefixCls }}>
      <div
        ref={ref}
        id={id}
        className={classNames(
          prefixCls,
          `${prefixCls}-${tabPosition}`,
          `${prefixCls}-css-var`,
          {
            [`${prefixCls}-mobile`]: mobile,
            [`${prefixCls}-editable`]: editable,
            [`${prefixCls}-rtl`]: rtl,
          },
          className,
        )}
        {...restProps}
      >
        <TabNavListWrapper {...tabNavBarProps} renderTabBar={renderTabBar} />
        <TabPanelList
          destroyInactiveTabPane={destroyInactiveTabPane}
          {...sharedProps}
          animated={mergedAnimated}
        />
      </div>
    </TabContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
