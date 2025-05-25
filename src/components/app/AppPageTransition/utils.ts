import type { AnimationType } from ".";


export const animationConfig = {
  type: 'slide-left',    // 动画类型（可修改为fade/scale等）
  duration: 0.3,         // 动画时长
  slideDistance: 100,      // 滑动类动画偏移量
  scaleFactor: 0.9,       // 缩放类动画初始比例
  opacity: 0            // 淡入淡出初始透明度
};


// 生成过渡配置
export const getTransition = (animationType: AnimationType) => {
  const { type, duration, slideDistance, scaleFactor, opacity } = animationConfig;
  const base = { duration, transition: { duration } };
  const transitionType = animationType || type; // 如果没有指定动画类型，则使用默认类型slide-t
  switch (transitionType) {
    case 'slide-left':
      return {
        initial: { x: slideDistance, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -slideDistance, opacity: 0 },
        ...base
      };
    case 'slide-right':
      return {
        initial: { x: -slideDistance, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: slideDistance, opacity: 0 },
        ...base
      };
    case 'slide-top':
      return {
        initial: { y: slideDistance, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -slideDistance, opacity: 0 },
        ...base
      };
    case 'slide-bottom':
      return {
        initial: { y: -slideDistance, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: slideDistance, opacity: 0 },
        ...base
      };
    case 'scale':
      return {
        initial: { scale: scaleFactor, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: scaleFactor, opacity: 0 },
        ...base
      };
    default: // fade（默认类型）
      return {
        initial: { opacity },
        animate: { opacity: 1 },
        exit: { opacity },
        ...base
      };
  }
};