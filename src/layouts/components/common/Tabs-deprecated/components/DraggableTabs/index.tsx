import React from 'react';

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

import type { RenderTabBarProps } from '@/components/RaTabs-deprecated/interface';
import type { TabNavListProps } from '@/components/RaTabs-deprecated/TabNavList';

import LayoutTab from '../LayoutTab';

import type { DragEndEvent, DraggableAttributes } from '@dnd-kit/core';

import useTabsStoreSelector from '@/store/tabs';

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}
interface DraggableTabNodeProps extends DraggableAttributes {
  style: React.CSSProperties;
  ref: (node: HTMLElement | null) => void;
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

  return React.cloneElement<DraggableTabNodeProps>(
    props.children as React.ReactElement<DraggableTabNodeProps>,
    {
      ref: setNodeRef,
      style,
      ...attributes,
      ...listeners,
    },
  );
};

type DraggableTabsProps = {
  updateTabItems: any;
  itemKeys: string[];
  defaultProps: RenderTabBarProps;
  DefaultTabBar: React.ComponentType<TabNavListProps>;
};
const DraggableTabs = ({
  updateTabItems,
  itemKeys,
  DefaultTabBar,
  defaultProps,
}: DraggableTabsProps) => {
  const { tabItems } = useTabsStoreSelector('tabItems');
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      updateTabItems(() => {
        const activeIndex = tabItems!.findIndex((i) => i.key === active.id);
        const overIndex = tabItems!.findIndex((i) => i.key === over?.id);
        return arrayMove(tabItems!, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext
      sensors={[sensor]}
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext
        items={itemKeys}
        strategy={horizontalListSortingStrategy}
      >
        <DefaultTabBar {...defaultProps}>
          {(node, props, nodeKey, index) =>
            props.tab.pin ? (
              <LayoutTab
                node={node}
                props={props}
                nodeKey={nodeKey}
                updateTabItems={updateTabItems}
                index={index}
              />
            ) : (
              <DraggableTabNode
                {...(node.props || {})}
                key={node.key}
                data-node-key={nodeKey}
              >
                <div data-node-key={nodeKey}>
                  <LayoutTab
                    node={node}
                    props={props}
                    nodeKey={nodeKey}
                    updateTabItems={updateTabItems}
                    index={index}
                  />
                </div>
              </DraggableTabNode>
            )
          }
        </DefaultTabBar>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableTabs;
