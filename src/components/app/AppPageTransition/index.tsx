import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { getTransition } from './utils';

export type AnimationType = 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom' | 'scale' | 'fade';
type AppPageTransitionProps = {
  children: React.ReactNode;
  pageKey?: string;
  style?: React.CSSProperties;
  className?: string;
  animationType?: AnimationType;
};

const AppPageTransition = ({
  children,
  pageKey,
  style,
  className,
  animationType = 'fade'
}: AppPageTransitionProps) => {

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey || uuidv4()}
        {...getTransition(animationType)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',  // 保证层叠
          top: 0,
          left: 0,
          ...style
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AppPageTransition;
