import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';
import classNames from 'classnames';

import Tabs from '@/components/RaTabs';

import ChromeTab from './components/ChromeTab';
import TabDropdown from './components/TabDropdown';

import type { DragEndEvent } from '@dnd-kit/core';

import './index.css';
import useTabs from '@/layouts/hooks/useTabs';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props['data-node-key'],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'pointer',
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const AppTabs: React.FC = () => {
  const { tabItems, activeKey, setActiveKey, setTabItems } = useTabs();
  const navigate = useNavigate();
  const handleTabItemClick = (key: string) => {
    if (key === activeKey) return;
    setActiveKey(key);
    navigate(key);
  };
  const [tabType, setTabType] = useState('brisk');
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev!.findIndex((i) => i.key === active.id);
        const overIndex = prev!.findIndex((i) => i.key === over?.id);
        return arrayMove(prev!, activeIndex, overIndex);
      });
    }
  };
  return (
    <div className="flex items-center justify-between h-[40px] bg-[var(--ant-color-bg-container)]">
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
        onTabClick={(activeKey) => {
          handleTabItemClick(activeKey);
        }}
        className="layout-tabs flex-1"
        onChange={(activeKey) => setActiveKey(activeKey)}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={[sensor]}
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
          >
            <SortableContext
              items={tabItems!.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node, props, nodeKey) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    <div
                      data-node-key={tabType === 'chrome' ? nodeKey : undefined}
                      className={classNames({
                        'layout-tabs-tab': true,
                        'layout-tabs-tab-wrapper-active': props.active,
                        'layout-tabs-tab-chrome': tabType === 'chrome',
                        'layout-tabs-tab-card': tabType === 'card',
                        'layout-tabs-tab-classic': tabType === 'classic',
                        'layout-tabs-tab-trapezoid': tabType === 'trapezoid',
                        'layout-tabs-tab-brisk': tabType === 'brisk',
                        'layout-tabs-tab-rhythm': tabType === 'rhythm',
                      })}
                    >
                      {tabType === 'chrome' ? (
                        <ChromeTab {...props} />
                      ) : (
                        <TabDropdown>{node}</TabDropdown>
                      )}
                      {/* <TabDropdown>{node}</TabDropdown> */}
                    </div>
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
        tabBarExtraContent={{
          right: (
            <div className="flex items-center h-full">
              <span className="app-tabs-right-item">
                <div className="w-full h-full flex items-center">
                  <Icon icon="ant-design:reload-outlined" />
                </div>
              </span>
              <span className="app-tabs-right-item">
                <TabDropdown trigger={['click']}>
                  <div className="w-full h-full flex items-center">
                    <Icon icon="lucide:chevron-down" />
                  </div>
                </TabDropdown>
              </span>
              <span className="app-tabs-right-item">
                <div className="w-full h-full flex items-center">
                  <Icon icon="lucide:fullscreen" />
                </div>
              </span>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default AppTabs;
