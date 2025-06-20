import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import DraggableTabs from './components/DraggableTabs';
import ExtraContent from './components/ExtraContent';
import LayoutTabs from './components/Tabs';
import TabWithDropdown from './components/TabWithDropdown';
import useTabs from './hooks/useTabs';
import useTabActions from './hooks/useTabsActions';

import type { TabStyle } from '@/store/tabs';

import useTabsStoreSelector from '@/store/tabs';

import './index.css';

const Tabs = () => {
  const navigate = useNavigate();
  const { updateTabItems } = useTabs();
  const { tabItems, draggable, tabStyle, activeKey, setActiveKey } =
    useTabsStoreSelector([
      'activeKey',
      'tabItems',
      'setActiveKey',
      'setTabItems',
      'draggable',
      'tabStyle',
    ]);
  const { deleteTabFunc } = useTabActions({ updateTabItems });

  const handleTabItemClick = (key: string) => {
    if (key === activeKey) return;
    setActiveKey(key);
    navigate(key);
  };
  const activeTab = useMemo(() => {
    if (tabItems) return tabItems.find((i) => i.key === activeKey);
  }, [activeKey, tabItems]);
  const activeTabIndex = useMemo(() => {
    if (tabItems) return tabItems.findIndex((i) => i.key === activeKey);
    return -1;
  }, [activeKey, tabItems]);
  const getClassName = (tabStyle: TabStyle) => {
    switch (tabStyle) {
      case 'chrome':
        return 'ra-chrome-tabs';
      case 'card':
        return 'ra-card-tabs';
      case 'classic':
        return 'ra-classic-tabs';
      case 'trapezoid':
        return 'ra-trapezoid-tabs';
      case 'line1':
        return 'ra-line-tabs-1 line-tabs-bottom';
      case 'line2':
        return 'ra-line-tabs-2 line-tabs-bottom';
      default:
        return 'ra-classic-tabs';
    }
  };
  return (
    <LayoutTabs
      tabs={tabItems}
      activeKey={activeKey}
      onTabItemClick={handleTabItemClick}
      onTabItemClose={deleteTabFunc}
      className={getClassName(tabStyle)}
      renderTabBar={(tabBarProps, DefaultTabBar) =>
        draggable ? (
          <DraggableTabs
            updateTabItems={updateTabItems}
            itemKeys={tabItems!.map((i) => i.key)}
            defaultProps={tabBarProps}
            DefaultTabBar={DefaultTabBar}
          />
        ) : (
          <DefaultTabBar {...tabBarProps}>
            {(node, props, nodeKey, index) => (
              <div
                className={classNames({
                  'h-full': true,
                  'ra-layout-tabs-tab-wrapper': true,
                  'ra-layout-tabs-tab-wrapper-active': props.active,
                })}
              >
                <TabWithDropdown
                  node={node}
                  props={props}
                  nodeKey={nodeKey}
                  updateTabItems={updateTabItems}
                  index={index}
                />
              </div>
            )}
          </DefaultTabBar>
        )
      }
      extraContent={
        <ExtraContent
          updateTabItems={updateTabItems}
          tabIndex={activeTabIndex}
          tab={activeTab}
        />
      }
    />
  );
};

export default Tabs;
