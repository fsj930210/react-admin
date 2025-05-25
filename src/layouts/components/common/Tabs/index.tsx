import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Tabs from '@/components/RaTabs';

import DraggableTabs from './components/DraggableTabs';
import LayoutTab from './components/LayoutTab';
import TabBarExtraContent from './components/TabBarExtraContent';
import useTabs from './hooks/useTabs';
import useTabActions from './hooks/useTabsActions';

import useTabsStoreSelector from '@/store/tabs';
import './index.css';

const LayoutTabs = () => {
  const { updateTabItems } = useTabs();
  const { tabItems, activeKey, setActiveKey, draggable } = useTabsStoreSelector(
    ['activeKey', 'tabItems', 'setActiveKey', 'setTabItems', 'draggable'],
  );
  const { deleteTabFunc } = useTabActions({ updateTabItems });
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col bg-[var(--ant-color-bg-container)] border-b-[1px] border-b-[var(--ant-color-border)] border-b-solid">
      <Tabs
        hideAdd
        items={tabItems}
        activeKey={activeKey}
        tabPosition="top"
        more={{
          overlayStyle: {
            minWidth: 120,
          },
        }}
        editable={{
          onEdit: (action, target) => {
            if (action === 'remove') {
              deleteTabFunc(target.key as string);
            }
          },
        }}
        onTabClick={handleTabItemClick}
        className="layout-tabs flex-1"
        onChange={(activeKey) => setActiveKey(activeKey)}
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
                <LayoutTab
                  node={node}
                  props={props}
                  nodeKey={nodeKey}
                  updateTabItems={updateTabItems}
                  index={index}
                />
              )}
            </DefaultTabBar>
          )
        }
        tabBarExtraContent={{
          right: (
            <TabBarExtraContent
              updateTabItems={updateTabItems}
              tab={activeTab}
              tabIndex={activeTabIndex}
            />
          ),
        }}
      />
    </div>
  );
};

export default LayoutTabs;
