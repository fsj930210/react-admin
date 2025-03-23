import { DEFAULT_SCROLL_CONFIG, type ScrollConfig } from '../config';
import type { TabOffsetMap } from '../interface';

interface ScrollOptions {
  rtl?: boolean;
  visibleTabContentValue: number;
  transformMin: number;
  transformMax: number;
  transformLeft: number;
  transformTop: number;
  scrollConfig?: ScrollConfig;
}

/** 计算滚动距离 */
export const calculateScrollDistance = (
  visibleTabs: { key: string }[],
  tabOffsets: TabOffsetMap,
  direction: 'prev' | 'next',
  options: ScrollOptions,
  isVertical?: boolean,
) => {
  const {
    rtl,
    transformMin,
    transformMax,
    transformLeft,
    transformTop,
    scrollConfig = DEFAULT_SCROLL_CONFIG,
  } = options;

  const referenceTab =
    direction === 'next' ? visibleTabs[visibleTabs.length - 1] : visibleTabs[0];

  if (!referenceTab) return 0;

  const referenceOffset = tabOffsets.get(referenceTab.key);
  if (!referenceOffset) return 0;

  if (isVertical) {
    const baseDistance = referenceOffset.height * scrollConfig.SCROLL_FACTOR;
    const remainingDistance =
      direction === 'next'
        ? Math.abs(transformMin - transformTop)
        : Math.abs(transformTop);

    if (
      remainingDistance <
      referenceOffset.height * scrollConfig.BOUNDARY_THRESHOLD
    ) {
      return remainingDistance;
    }
    return baseDistance;
  }

  const baseDistance = referenceOffset.width * scrollConfig.SCROLL_FACTOR;
  const remainingDistance =
    direction === 'next'
      ? Math.abs(transformMin - transformLeft)
      : rtl
        ? Math.abs(transformMax - transformLeft)
        : Math.abs(transformLeft);

  if (
    remainingDistance <
    referenceOffset.width * scrollConfig.BOUNDARY_THRESHOLD
  ) {
    return remainingDistance;
  }

  return baseDistance;
};

/** 平滑滚动实现 */
export const smoothScroll = (
  setState: React.Dispatch<React.SetStateAction<number>>,
  offset: number,
  alignInRange: (value: number) => number,
  scrollConfig: ScrollConfig = DEFAULT_SCROLL_CONFIG,
): void => {
  if (Math.abs(offset) < scrollConfig.MIN_SCROLL_DISTANCE) return;

  const scrollAmount = Math.min(
    Math.abs(offset) * scrollConfig.ANIMATION_SPEED,
    scrollConfig.MAX_SCROLL_STEP,
  );
  let remaining = Math.abs(offset);

  const scrollStep = () => {
    const scrollOffset = Math.sign(offset) * Math.min(scrollAmount, remaining);
    setState((value) => alignInRange(value + scrollOffset));
    remaining -= Math.abs(scrollOffset);

    if (remaining > 0) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};
