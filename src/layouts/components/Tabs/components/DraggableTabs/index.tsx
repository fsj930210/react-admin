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

import type { RenderTabBarProps, Tab } from '@/components/RaTabs/interface';
import type { TabNavListProps } from '@/components/RaTabs/TabNavList';
import type { TabNodeProps } from '@/components/RaTabs/TabNavList/TabNode';

import type { DragEndEvent } from '@dnd-kit/core';

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

type DraggableTabsProps = {
  updateTabItems: any;
  itemKeys: string[];
  defaultProps: RenderTabBarProps;
  DefaultTabBar: React.ComponentType<TabNavListProps>;
  children: TabNodeProps['renderWrapper'];
};
const DraggableTabs = ({
  updateTabItems,
  itemKeys,
  DefaultTabBar,
  defaultProps,
  children,
}: DraggableTabsProps) => {
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      updateTabItems((prev: Tab[]) => {
        const activeIndex = prev!.findIndex((i) => i.key === active.id);
        const overIndex = prev!.findIndex((i) => i.key === over?.id);
        return arrayMove(prev!, activeIndex, overIndex);
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
          {(node, props, nodeKey) =>
            props.tab.pin ? (
              children ? (
                children(node, props, nodeKey)
              ) : (
                <></>
              )
            ) : (
              <DraggableTabNode {...node.props} key={node.key}>
                {children ? children(node, props, nodeKey) : <></>}
              </DraggableTabNode>
            )
          }
        </DefaultTabBar>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableTabs;
