import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useShallow } from 'zustand/react/shallow';

import Tabs from '@/components/RaTabs';

import DraggableTabs from './components/DraggableTabs';
import LayoutTab from './components/LayoutTab';
import TabBarExtraContent from './components/TabBarExtraContent';

import useTabs from '@/layouts/hooks/useTabs';
import './index.css';
import useTabActions from '@/layouts/hooks/useTabsActions';
import useTabsStore from '@/store/tabs';

const LayoutTabs = () => {
  const { updateTabItems } = useTabs();
  const { tabItems, activeKey, setActiveKey } = useTabsStore(
    useShallow((state) => ({
      tabItems: state.tabItems,
      activeKey: state.activeKey,
      setActiveKey: state.setActiveKey,
      setTabItems: state.setTabItems,
    })),
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
  const [draggable] = useState(true);

  return (
    <div className="flex flex-col bg-[var(--ant-color-bg-container)]">
      <Tabs
        hideAdd
        items={tabItems}
        activeKey={activeKey}
        tabPosition="top"
        more={{
          overlayStyle: {
            width: 100,
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
