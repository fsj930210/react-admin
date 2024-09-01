// zombieJ: To compatible with `renderTabBar` usage.

import React from 'react';

import { RenderTabBarProps } from '../interface';
import TabContext from '../TabContext';
import TabPane from '../TabPanelList/TabPane';

import TabNavList from '.';

import type { TabNavListProps } from '.';

export type TabNavListWrapperProps = Pick<
  TabNavListProps,
  keyof RenderTabBarProps
> &
  Pick<TabNavListProps, 'renderTabBar'>;

// We have to create a TabNavList components.
const TabNavListWrapper: React.FC<TabNavListWrapperProps> = ({
  renderTabBar,
  ...restProps
}) => {
  const { tabs } = React.useContext(TabContext);
  if (renderTabBar) {
    const tabNavBarProps = {
      ...restProps,
      // Legacy support. We do not use this actually
      panes: tabs.map<React.ReactNode>(({ label, key, ...restTabProps }) => (
        <TabPane tab={label} key={key} tabKey={key} {...restTabProps} />
      )),
    };

    return renderTabBar(tabNavBarProps, TabNavList);
  }

  return <TabNavList {...restProps} />;
};

if (process.env.NODE_ENV !== 'production') {
  TabNavListWrapper.displayName = 'TabNavListWrapper';
}

export default TabNavListWrapper;
