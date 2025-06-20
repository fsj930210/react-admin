import LayoutTabs from './Tabs';

import type { LayoutTabsProps } from './interface';

type TabsProps = {
  renderTabBar?: (
    tabBarProps: LayoutTabsProps,
    DefaultTabBar: React.ComponentType<LayoutTabsProps>,
  ) => React.ReactNode;
} & LayoutTabsProps;

const Tabs = ({ renderTabBar, ...restProps }: TabsProps) => {
  if (renderTabBar) {
    return renderTabBar(restProps, LayoutTabs);
  }
  return <LayoutTabs {...restProps} />;
};

export default Tabs;
