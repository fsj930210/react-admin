import React, { useState } from 'react';

import {
  DownOutlined,
  FullscreenOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tabs } from 'antd';

import ChromeTab from './components/ChromeTab';
import TabDropdown from './components/Dropdown';

import type { DragEndEvent } from '@dnd-kit/core';

import './index.css';

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
    cursor: 'move',
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const AppTabs: React.FC = () => {
  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Tab 4',
      children: 'Content of Tab Pane 4',
    },
    {
      key: '5',
      label: 'Tab 5',
      children: 'Content of Tab Pane 5',
    },
  ]);
  const [activeKey, setActiveKey] = useState('1');
  const [hoveringKey, setHoveringKey] = useState('');
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  return (
    <div className="flex items-center justify-between h-[40px] bg-white border-b-solid border-b-1 border-b-[#f0f0f0]">
      <Tabs
        hideAdd
        items={items}
        type="editable-card"
        className="app-tabs flex-1"
        onChange={(activeKey) => setActiveKey(activeKey)}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={[sensor]}
            onDragEnd={onDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    <div
                      className="chrome-tabs-tab-container"
                      onMouseEnter={() => {
                        setHoveringKey(node.key as string);
                      }}
                      onMouseLeave={() => {
                        setHoveringKey('');
                      }}
                    >
                      <ChromeTab
                        activeKey={activeKey}
                        items={items}
                        node={node}
                        hoveringKey={hoveringKey}
                      />
                    </div>
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
      <div className="flex items-center h-full">
        <span className="app-tabs-right-item">
          <RedoOutlined title="重新加载" />
        </span>
        <span className="app-tabs-right-item">
          <TabDropdown trigger={['click']}>
            <DownOutlined title="展开" />
          </TabDropdown>
        </span>
        <span className="app-tabs-right-item">
          <FullscreenOutlined title="全屏浏览" />
        </span>
      </div>
    </div>
  );
};

export default AppTabs;
