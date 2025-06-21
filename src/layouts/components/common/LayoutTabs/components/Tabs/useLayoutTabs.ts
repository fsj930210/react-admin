import { useEffect, useRef, useState } from 'react';

interface LayoutTabsOptions {
  scrollStep?: number;
  animationDuration?: number;
  debounceTime?: number;
  activeKey?: string;
}

export const useLayoutTabs = ({
  scrollStep = 150,
  animationDuration = 300,
  activeKey = '',
}: LayoutTabsOptions = {}) => {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef<number>(0); // 存储之前的宽度
  const [showArrows, setShowArrows] = useState(false);
  const isScrollingRef = useRef(false);
  const activeKeyRef = useRef(activeKey);
  const [canScroll, setCanScroll] = useState({
    left: false,
    right: false,
  });
  // 计算滚动状态
  const checkScrollState = () => {
    const container = tabsListRef.current;
    if (!container) return;
    setShowArrows(container.scrollWidth > container.clientWidth);
    setCanScroll({
      left: container.scrollLeft > 0,
      right:
        container.scrollLeft < container.scrollWidth - container.clientWidth,
    });
  };

  // 精确的nextTick实现
  const nextTick = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  };

  // 滚动到活动标签（使用scrollIntoView）
  const scrollToActiveIntoView = async () => {
    const container = tabsListRef.current;
    if (!container || !activeKeyRef.current) return;
    // 等待DOM更新完成
    await nextTick();
    requestAnimationFrame(() => {
      const targetTab = container.querySelector(
        `div[data-tab-key="${activeKeyRef.current}"]`,
      ) as HTMLElement | null;
      if (targetTab && !isScrollingRef.current) {
        isScrollingRef.current = true;
        targetTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });

        // 等待滚动完成后更新状态
        setTimeout(() => {
          isScrollingRef.current = false;
        }, animationDuration);
      }
    });
  };
  // 滚动逻辑
  const handleScroll = (direction: 'left' | 'right') => {
    const container = tabsListRef.current;
    if (!container || isScrollingRef.current) return;

    const amount = direction === 'left' ? -scrollStep : scrollStep;
    const scroll = direction === 'left' ? canScroll.left : canScroll.right;

    if (!scroll) return;
    isScrollingRef.current = true;
    container.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => {
      isScrollingRef.current = false;
    }, animationDuration);
  };

  useEffect(() => {
    const container = tabsListRef.current;
    if (!container) return;

    // ResizeObserver监听容器尺寸变化 - 仅检查滚动状态
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentWidth = entry.contentRect.width;
        // 只在容器宽度变化时检查滚动状态
        if (prevWidthRef.current !== currentWidth) {
          console.log('Container width changed:', currentWidth, activeKey);
          prevWidthRef.current = currentWidth;
          checkScrollState();
          scrollToActiveIntoView();
        }
      }
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    activeKeyRef.current = activeKey;
    scrollToActiveIntoView();
  }, [activeKey]);
  return {
    tabsListRef,
    showArrows,
    scrollLeft: () => handleScroll('left'),
    scrollRight: () => handleScroll('right'),
    scrollToActiveIntoView,
    canScroll,
    activeKey,
  };
};
