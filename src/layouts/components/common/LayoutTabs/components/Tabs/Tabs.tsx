import type React from 'react';

import classNames from 'classnames';

import RaIcon from '@/components/RaIcon';

import TabNode from './TabNode';
import { useLayoutTabs } from './useLayoutTabs';

import './index.css';
import type { LayoutTabsProps } from './interface';

const LayoutTabs = (props: LayoutTabsProps) => {
  const { children, ...rest } = props;
  const {
    activeKey,
    tabs,
    scrollStep = 100,
    className,
    onTabItemClick,
    onTabItemClose,
  } = rest;

  // 使用滚动钩子
  const { tabsListRef, showArrows, canScroll, scrollLeft, scrollRight } =
    useLayoutTabs({ scrollStep, activeKey });

  // 处理标签点击
  const handleTabClick = (key: string) => {
    const targetTab = tabs.find((tab) => tab.key === key);
    if (targetTab?.disabled) return;

    onTabItemClick?.(key);
  };

  // 处理标签关闭
  const handleTabClose = (key: string, event: React.MouseEvent) => {
    console.log(3333);
    event.stopPropagation();
    onTabItemClose?.(key);
  };

  return (
    <div className={`ra-layout-tabs ${className || ''}`}>
      <div className="ra-layout-tabs-container scrollbar-hide">
        {showArrows ? (
          <span
            onClick={scrollLeft}
            className={classNames({
              'ra-layout-tabs-arrow': true,
              'ra-layout-tabs-arrow-left ': true,
              'ra-layout-tabs-arrow-disabled': !canScroll.left,
            })}
          >
            <RaIcon icon="lucide:chevrons-left" fontSize={18} />
          </span>
        ) : null}
        <div
          ref={tabsListRef}
          className="ra-layout-tabs-list"
          style={{ scrollbarWidth: 'none' }}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.key === activeKey;
            return (
              <TabNode
                tab={tab}
                key={tab.key}
                index={index}
                active={isActive}
                onClick={handleTabClick}
                onClose={handleTabClose}
                customRenderTab={children}
              />
            );
          })}
        </div>

        {showArrows ? (
          <span
            onClick={scrollRight}
            className={classNames({
              'ra-layout-tabs-arrow': true,
              'ra-layout-tabs-arrow-right ': true,
              'ra-layout-tabs-arrow-disabled': !canScroll.right,
            })}
          >
            <RaIcon icon="lucide:chevrons-right" fontSize={18} />
          </span>
        ) : null}
        {rest.extraContent ? (
          <div className="ra-layout-tabs-extra-content">
            {rest.extraContent}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LayoutTabs;
