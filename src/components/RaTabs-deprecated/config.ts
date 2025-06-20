/** 滚动配置 */
export interface ScrollConfig {
  // 默认滚动系数 (1.5 表示滚动 1.5 个标签的距离)
  SCROLL_FACTOR: number;
  // 动画步长系数 (值越大滚动越快)
  ANIMATION_SPEED: number;
  // 最大单步滚动距离(px)
  MAX_SCROLL_STEP: number;
  // 最小滚动距离(px)
  MIN_SCROLL_DISTANCE: number;
  // 边界阈值(用于判断是否直接滚动到边界)
  BOUNDARY_THRESHOLD: number;
}

export const DEFAULT_SCROLL_CONFIG: ScrollConfig = {
  SCROLL_FACTOR: 1.5,
  ANIMATION_SPEED: 0.2,
  MAX_SCROLL_STEP: 20,
  MIN_SCROLL_DISTANCE: 1,
  BOUNDARY_THRESHOLD: 2,
};
