import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Tabs from '@/components/RaTabs';

import DraggableTabs from './components/DraggableTabs';
import LayoutTab from './components/LayoutTab';
import TabBarExtraContent from './components/TabBarExtraContent';

import useTabs from '@/layouts/hooks/useTabs';
import './index.css';

const AppTabs: React.FC = () => {
  const { tabItems, activeKey, setActiveKey, updateTabItems } = useTabs();
  const navigate = useNavigate();
  const handleTabItemClick = (
    key: string,
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target);
    if (key === activeKey) return;
    setActiveKey(key);
    navigate(key);
  };

  const [draggable] = useState(false);
  return (
    <div className=" h-full flex flex-col  bg-[var(--ant-color-bg-container)] flex-1">
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
          onEdit: () => {
            console.log(1);
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
            >
              {(node, props, nodeKey) => (
                <LayoutTab
                  node={node}
                  props={props}
                  nodeKey={nodeKey}
                  updateTabItems={updateTabItems}
                />
              )}
            </DraggableTabs>
          ) : (
            <DefaultTabBar {...tabBarProps}>
              {(node, props, nodeKey) => (
                <LayoutTab
                  node={node}
                  props={props}
                  nodeKey={nodeKey}
                  updateTabItems={updateTabItems}
                />
              )}
            </DefaultTabBar>
          )
        }
        tabBarExtraContent={{
          right: <TabBarExtraContent />,
        }}
      />
    </div>
  );
};

export default AppTabs;
