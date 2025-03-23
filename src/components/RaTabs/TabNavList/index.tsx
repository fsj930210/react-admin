import React, { useEffect, useRef, useState } from 'react';
import type { Ref, RefObject } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import useEvent from 'rc-util/lib/hooks/useEvent';
import { useComposeRef } from 'rc-util/lib/ref';

import useIndicator from '../hooks/useIndicator';
import useOffsets from '../hooks/useOffsets';
import useSyncState from '../hooks/useSyncState';
import useTouchMove from '../hooks/useTouchMove';
import useUpdate, { useUpdateState } from '../hooks/useUpdate';
import useVisibleRange from '../hooks/useVisibleRange';
import TabContext from '../TabContext';
import { genDataNodeKey, stringify } from '../util';

import AddButton from './AddButton';
import ExtraContent from './ExtraContent';
import OperationNode from './OperationNode';
import ScrollButton from './ScrollButton';
import TabNode from './TabNode';
// 引入工具函数
import { calculateScrollDistance, smoothScroll } from '../utils/scroll';

import type { TabNodeProps } from './TabNode';
import type { GetIndicatorSize } from '../hooks/useIndicator';
import type {
  AnimatedConfig,
  EditableConfig,
  MoreProps,
  OnTabScroll,
  RenderTabBar,
  SizeInfo,
  TabBarExtraContent,
  TabOffset,
  TabPosition,
  TabSizeMap,
  TabsLocale,
} from '../interface';
import type { ScrollConfig } from '../config';

export interface TabNavListProps {
  id?: string;
  tabPosition: TabPosition;
  activeKey: string;
  rtl: boolean;
  animated?: AnimatedConfig;
  extra?: TabBarExtraContent;
  editable?: EditableConfig;
  more?: MoreProps;
  mobile: boolean;
  tabBarGutter?: number;
  renderTabBar?: RenderTabBar;
  className?: string;
  style?: React.CSSProperties;
  locale?: TabsLocale;
  onTabClick: (
    activeKey: string,
    e: React.MouseEvent | React.KeyboardEvent,
  ) => void;
  onTabScroll?: OnTabScroll;
  children?: (
    node: React.ReactElement,
    props: Omit<TabNodeProps, 'renderWrapper'>,
    nodeKey: string,
    index: number,
  ) => React.ReactElement;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  popupClassName?: string;
  indicator?: {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
  };
  showInkBar?: boolean;
  hideAdd?: boolean;
  scrollConfig?: ScrollConfig;
  ref?: Ref<HTMLDivElement>;
}

const getTabSize = (
  tab: HTMLElement,
  containerRect: { x: number; y: number },
) => {
  // tabListRef
  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tab;
  const { width, height, x, y } = tab.getBoundingClientRect();

  // Use getBoundingClientRect to avoid decimal inaccuracy
  if (Math.abs(width - offsetWidth) < 1) {
    return [width, height, x - containerRect.x, y - containerRect.y];
  }

  return [offsetWidth, offsetHeight, offsetLeft, offsetTop];
};

const getSize = (refObj: RefObject<HTMLElement>): SizeInfo => {
  const { offsetWidth = 0, offsetHeight = 0 } = refObj.current || {};

  // Use getBoundingClientRect to avoid decimal inaccuracy
  if (refObj.current) {
    const { width, height } = refObj.current.getBoundingClientRect();

    if (Math.abs(width - offsetWidth) < 1) {
      return [width, height];
    }
  }

  return [offsetWidth, offsetHeight];
};

/**
 * Convert `SizeInfo` to unit value. Such as [123, 456] with `top` position get `123`
 */
const getUnitValue = (size: SizeInfo, tabPositionTopOrBottom: boolean) => {
  return size[tabPositionTopOrBottom ? 0 : 1];
};

const TabNavList = (props: TabNavListProps) => {
  const {
    className,
    style,
    id,
    animated,
    activeKey,
    rtl,
    extra,
    editable,
    locale,
    tabPosition,
    tabBarGutter,
    showInkBar,
    children,
    onTabClick,
    onTabScroll,
    indicator,
    hideAdd,
    scrollConfig,
    ref,
  } = props;

  const { prefixCls, tabs } = React.useContext(TabContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const extraLeftRef = useRef<HTMLDivElement>(null);
  const extraRightRef = useRef<HTMLDivElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const operationsRef = useRef<HTMLDivElement>(null);
  const innerAddButtonRef = useRef<HTMLButtonElement>(null);
  const scrollButtonLeftRef = useRef<HTMLDivElement>(null);
  const scrollButtonRightRef = useRef<HTMLDivElement>(null);
  const tabPositionTopOrBottom =
    tabPosition === 'top' || tabPosition === 'bottom';

  const [transformLeft, setTransformLeft] = useSyncState(0, (next, prev) => {
    if (tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({ direction: next > prev ? 'left' : 'right' });
    }
  });
  const [transformTop, setTransformTop] = useSyncState(0, (next, prev) => {
    if (!tabPositionTopOrBottom && onTabScroll) {
      onTabScroll({ direction: next > prev ? 'top' : 'bottom' });
    }
  });

  const [containerExcludeExtraSize, setContainerExcludeExtraSize] =
    useState<SizeInfo>([0, 0]);
  const [tabContentSize, setTabContentSize] = useState<SizeInfo>([0, 0]);
  const [addSize, setAddSize] = useState<SizeInfo>([0, 0]);
  const [operationSize, setOperationSize] = useState<SizeInfo>([0, 0]);

  const [tabSizes, setTabSizes] = useUpdateState<TabSizeMap>(new Map());
  const tabOffsets = useOffsets(tabs, tabSizes, tabContentSize[0]);

  // ========================== Unit =========================
  const containerExcludeExtraSizeValue = getUnitValue(
    containerExcludeExtraSize,
    tabPositionTopOrBottom,
  );
  const tabContentSizeValue = getUnitValue(
    tabContentSize,
    tabPositionTopOrBottom,
  );
  const addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
  const operationSizeValue = getUnitValue(
    operationSize,
    tabPositionTopOrBottom,
  );

  const needScroll =
    containerExcludeExtraSizeValue < tabContentSizeValue + addSizeValue;
  const visibleTabContentValue = needScroll
    ? containerExcludeExtraSizeValue - operationSizeValue
    : containerExcludeExtraSizeValue - addSizeValue;

  // ========================== Util =========================
  const operationsHiddenClassName = `${prefixCls}-nav-operations-hidden`;
  let transformMin = 0;
  let transformMax = 0;

  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, tabContentSizeValue - visibleTabContentValue);
  } else {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  }

  function alignInRange(value: number): number {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  }

  // ========================= Mobile ========================
  const touchMovingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lockAnimation, setLockAnimation] = useState<number>();

  function doLockAnimation() {
    setLockAnimation(Date.now());
  }

  function clearTouchMoving() {
    if (touchMovingRef.current) {
      clearTimeout(touchMovingRef.current);
    }
  }

  const handleNext = () => {
    if (tabPositionTopOrBottom) {
      const visibleTabs = tabs.slice(visibleStart, visibleEnd + 1);
      const scrollDistance = calculateScrollDistance(
        visibleTabs,
        tabOffsets,
        'next',
        {
          rtl,
          visibleTabContentValue,
          transformMin,
          transformMax,
          transformLeft,
          transformTop,
          scrollConfig,
        },
        false,
      );
      smoothScroll(
        setTransformLeft,
        -scrollDistance,
        alignInRange,
        scrollConfig,
      );
    } else {
      const visibleTabs = tabs.slice(visibleStart, visibleEnd + 1);
      const scrollDistance = calculateScrollDistance(
        visibleTabs,
        tabOffsets,
        'next',
        {
          rtl,
          visibleTabContentValue,
          transformMin,
          transformMax,
          transformLeft,
          transformTop,
          scrollConfig,
        },
        true,
      );
      smoothScroll(
        setTransformTop,
        -scrollDistance,
        alignInRange,
        scrollConfig,
      );
    }
  };

  const handlePrev = () => {
    if (tabPositionTopOrBottom) {
      const visibleTabs = tabs.slice(visibleStart, visibleEnd + 1);
      const scrollDistance = calculateScrollDistance(
        visibleTabs,
        tabOffsets,
        'prev',
        {
          rtl,
          visibleTabContentValue,
          transformMin,
          transformMax,
          transformLeft,
          transformTop,
          scrollConfig,
        },
        false,
      );
      smoothScroll(
        setTransformLeft,
        scrollDistance,
        alignInRange,
        scrollConfig,
      );
    } else {
      const visibleTabs = tabs.slice(visibleStart, visibleEnd + 1);
      const scrollDistance = calculateScrollDistance(
        visibleTabs,
        tabOffsets,
        'prev',
        {
          rtl,
          visibleTabContentValue,
          transformMin,
          transformMax,
          transformLeft,
          transformTop,
          scrollConfig,
        },
        true,
      );
      smoothScroll(setTransformTop, scrollDistance, alignInRange, scrollConfig);
    }
  };
  // 触摸滑动处理
  useTouchMove(
    tabsWrapperRef as RefObject<HTMLDivElement>,
    (offsetX, offsetY) => {
      if (!needScroll) {
        return false;
      }

      if (tabPositionTopOrBottom) {
        smoothScroll(setTransformLeft, offsetX, alignInRange, scrollConfig);
      } else {
        smoothScroll(setTransformTop, offsetY, alignInRange, scrollConfig);
      }

      clearTouchMoving();
      doLockAnimation();

      return true;
    },
  );

  useEffect(() => {
    clearTouchMoving();
    if (lockAnimation) {
      touchMovingRef.current = setTimeout(() => {
        setLockAnimation(0);
      }, 100);
    }

    return clearTouchMoving;
  }, [lockAnimation]);

  // ===================== Visible Range =====================
  // Render tab node & collect tab offset
  const [visibleStart, visibleEnd] = useVisibleRange(
    tabOffsets,
    // Container
    visibleTabContentValue,
    // Transform
    tabPositionTopOrBottom ? transformLeft : transformTop,
    // Tabs
    tabContentSizeValue,
    // Add
    addSizeValue,
    // Operation
    operationSizeValue,
    { ...props, tabs },
  );

  // ========================= Scroll ========================
  const scrollToTab = useEvent((key = activeKey) => {
    const tabOffset = tabOffsets.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
    };
    if (tabPositionTopOrBottom) {
      let newTransform = transformLeft;

      if (rtl) {
        // RTL 模式
        if (tabOffset.right < transformLeft) {
          // 新标签在左侧，计算实际需要滚动的距离
          newTransform = Math.max(
            transformMin,
            Math.min(transformMax, tabOffset.right),
          );
        } else if (
          tabOffset.right + tabOffset.width >
          transformLeft + visibleTabContentValue
        ) {
          // 新标签在右侧，确保完全显示
          newTransform = Math.max(
            transformMin,
            Math.min(
              transformMax,
              tabOffset.right + tabOffset.width - visibleTabContentValue,
            ),
          );
        }
      } else {
        // LTR 模式
        if (tabOffset.left < -transformLeft) {
          // 新标签在左侧
          newTransform = Math.max(
            transformMin,
            Math.min(transformMax, -tabOffset.left),
          );
        } else if (
          tabOffset.left + tabOffset.width >
          -transformLeft + visibleTabContentValue
        ) {
          // 新标签在右侧
          newTransform = Math.max(
            transformMin,
            Math.min(
              transformMax,
              -(tabOffset.left + tabOffset.width - visibleTabContentValue),
            ),
          );
        }
      }

      setTransformTop(0);
      if (newTransform !== transformLeft) {
        const scrollDistance = newTransform - transformLeft;
        smoothScroll(setTransformLeft, scrollDistance, alignInRange);
      }
    } else {
      // 垂直方向滚动逻辑
      let newTransform = transformTop;

      if (tabOffset.top < -transformTop) {
        newTransform = Math.max(
          transformMin,
          Math.min(transformMax, -tabOffset.top),
        );
      } else if (
        tabOffset.top + tabOffset.height >
        -transformTop + visibleTabContentValue
      ) {
        newTransform = Math.max(
          transformMin,
          Math.min(
            transformMax,
            -(tabOffset.top + tabOffset.height - visibleTabContentValue),
          ),
        );
      }

      setTransformLeft(0);
      if (newTransform !== transformTop) {
        const scrollDistance = newTransform - transformTop;
        smoothScroll(setTransformTop, scrollDistance, alignInRange);
      }
    }
  });

  // ========================== Tab ==========================
  const tabNodeStyle: React.CSSProperties = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    tabNodeStyle[rtl ? 'marginRight' : 'marginLeft'] = tabBarGutter;
  } else {
    tabNodeStyle.marginTop = tabBarGutter;
  }

  const tabNodes = tabs.map<React.ReactNode>((tab, i) => {
    const { key } = tab;
    return (
      <TabNode
        id={id}
        prefixCls={prefixCls}
        key={key}
        tab={tab}
        /* first node should not have margin left */
        style={i === 0 ? undefined : tabNodeStyle}
        closable={tab.closable}
        editable={editable}
        active={key === activeKey}
        renderWrapper={children}
        removeAriaLabel={locale?.removeAriaLabel}
        onClick={(e) => {
          onTabClick(key, e);
        }}
        index={i}
      />
    );
  });

  // Update buttons records
  const updateTabSizes = () =>
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      const listRect = tabListRef.current?.getBoundingClientRect();

      tabs.forEach(({ key }) => {
        const btnNode = tabListRef.current?.querySelector<HTMLElement>(
          `[data-node-key="${genDataNodeKey(key)}"]`,
        );
        if (btnNode) {
          const [width, height, left, top] = getTabSize(
            btnNode,
            listRect as DOMRect,
          );
          newSizes.set(key, { width, height, left, top });
        }
      });
      return newSizes;
    });

  useEffect(() => {
    updateTabSizes();
  }, [tabs.map((tab) => tab.key).join('_')]);

  const onListHolderResize = useUpdate(() => {
    // Update wrapper records
    const containerSize = getSize(containerRef as RefObject<HTMLDivElement>);
    const extraLeftSize = getSize(extraLeftRef as RefObject<HTMLDivElement>);
    const extraRightSize = getSize(extraRightRef as RefObject<HTMLDivElement>);
    const scrollButtonLeftSize = getSize(
      scrollButtonLeftRef as RefObject<HTMLDivElement>,
    );
    const scrollButtonRightSize = getSize(
      scrollButtonRightRef as RefObject<HTMLDivElement>,
    );
    setContainerExcludeExtraSize([
      containerSize[0] -
        extraLeftSize[0] -
        extraRightSize[0] -
        scrollButtonLeftSize[0] -
        scrollButtonRightSize[0],
      containerSize[1] -
        extraLeftSize[1] -
        extraRightSize[1] -
        scrollButtonLeftSize[1] -
        scrollButtonRightSize[1],
    ]);

    const newAddSize = getSize(
      innerAddButtonRef as RefObject<HTMLButtonElement>,
    );
    setAddSize(newAddSize);

    const newOperationSize = getSize(
      operationsRef as RefObject<HTMLDivElement>,
    );
    setOperationSize(newOperationSize);

    // Which includes add button size
    const tabContentFullSize = getSize(tabListRef as RefObject<HTMLDivElement>);
    setTabContentSize([
      tabContentFullSize[0] - newAddSize[0],
      tabContentFullSize[1] - newAddSize[1],
    ]);

    // Update buttons records
    updateTabSizes();
  });

  // ======================== Dropdown =======================
  const startHiddenTabs = tabs.slice(0, visibleStart);
  const endHiddenTabs = tabs.slice(visibleEnd + 1);
  const hiddenTabs = [...startHiddenTabs, ...endHiddenTabs];

  // =================== Link & Operations ===================
  const activeTabOffset = tabOffsets.get(activeKey) as TabOffset;
  const { style: indicatorStyle } = useIndicator({
    activeTabOffset,
    horizontal: tabPositionTopOrBottom,
    indicator,
    rtl,
  });

  // ========================= Effect ========================
  useEffect(() => {
    scrollToTab();
  }, [
    activeKey,
    transformMin,
    transformMax,
    // stringify(activeTabOffset),
    stringify(tabOffsets as any),
    tabPositionTopOrBottom,
  ]);

  // Should recalculate when rtl changed
  useEffect(() => {
    onListHolderResize();
  }, [rtl]);

  // ========================= Render ========================
  const hasDropdown = !!hiddenTabs.length;
  const wrapPrefix = `${prefixCls}-nav-wrap`;
  let pingLeft: boolean = false;
  let pingRight: boolean = false;
  let pingTop: boolean = false;
  let pingBottom: boolean = false;

  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft !== transformMax;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = transformLeft !== transformMin;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = transformTop !== transformMin;
  }
  return (
    <ResizeObserver onResize={onListHolderResize}>
      <div
        ref={useComposeRef(ref as Ref<HTMLDivElement>, containerRef)}
        role="tablist"
        className={classNames(`${prefixCls}-nav`, className)}
        style={style}
        onKeyDown={() => {
          // No need animation when use keyboard
          doLockAnimation();
        }}
      >
        <ExtraContent
          ref={extraLeftRef as RefObject<HTMLDivElement>}
          position="left"
          extra={extra}
          prefixCls={prefixCls}
        />
        <ScrollButton
          show={needScroll}
          prefixCls={prefixCls}
          position="left"
          disabled={!pingLeft}
          onClick={handlePrev}
          ref={scrollButtonLeftRef as RefObject<HTMLDivElement>}
        />
        <ResizeObserver onResize={onListHolderResize}>
          <div
            className={classNames(wrapPrefix, {
              [`${wrapPrefix}-ping-left`]: pingLeft,
              [`${wrapPrefix}-ping-right`]: pingRight,
              [`${wrapPrefix}-ping-top`]: pingTop,
              [`${wrapPrefix}-ping-bottom`]: pingBottom,
            })}
            ref={tabsWrapperRef}
          >
            <ResizeObserver onResize={onListHolderResize}>
              <div
                ref={tabListRef}
                className={`${prefixCls}-nav-list`}
                style={{
                  transform: `translate(${transformLeft}px, ${transformTop}px)`,
                  transition: lockAnimation ? 'none' : undefined,
                }}
              >
                {tabNodes}
                {hideAdd ? null : (
                  <AddButton
                    ref={innerAddButtonRef as RefObject<HTMLButtonElement>}
                    prefixCls={prefixCls}
                    locale={locale}
                    editable={editable}
                    style={{
                      ...(tabNodes.length === 0 ? undefined : tabNodeStyle),
                      visibility: hasDropdown ? 'hidden' : undefined,
                    }}
                  />
                )}

                {showInkBar ? (
                  <div
                    className={classNames(`${prefixCls}-ink-bar`, {
                      [`${prefixCls}-ink-bar-animated`]: animated?.inkBar,
                    })}
                    style={indicatorStyle}
                  />
                ) : null}
              </div>
            </ResizeObserver>
          </div>
        </ResizeObserver>

        <OperationNode
          {...props}
          removeAriaLabel={locale?.removeAriaLabel}
          ref={operationsRef as RefObject<HTMLDivElement>}
          prefixCls={prefixCls}
          tabs={hiddenTabs}
          className={!hasDropdown ? operationsHiddenClassName : ''}
          tabMoving={!!lockAnimation}
        />
        <ScrollButton
          show={needScroll}
          disabled={!pingRight}
          prefixCls={prefixCls}
          position="right"
          onClick={handleNext}
          ref={scrollButtonRightRef as RefObject<HTMLDivElement>}
        />
        <ExtraContent
          ref={extraRightRef as RefObject<HTMLDivElement>}
          position="right"
          extra={extra}
          prefixCls={prefixCls}
        />
      </div>
    </ResizeObserver>
  );
};
if (process.env.NODE_ENV !== 'production') {
  TabNavList.displayName = 'TabNavList';
}
export default TabNavList;
