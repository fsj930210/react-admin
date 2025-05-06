import React from 'react';
import type { Ref } from 'react';

import type {
  TabBarExtraContent,
  TabBarExtraMap,
  TabBarExtraPosition,
} from '../interface';

interface ExtraContentProps {
  position: TabBarExtraPosition;
  prefixCls: string;
  extra?: TabBarExtraContent;
  ref?: Ref<HTMLDivElement>;
}

const ExtraContent = (props: ExtraContentProps) => {
  const { position, prefixCls, extra, ref } = props;
  if (!extra) {
    return null;
  }

  let content: React.ReactNode;

  // Parse extra
  let assertExtra: TabBarExtraMap = {};
  if (typeof extra === 'object' && !React.isValidElement(extra)) {
    assertExtra = extra as TabBarExtraMap;
  } else {
    assertExtra.right = extra;
  }

  if (position === 'right') {
    content = assertExtra.right;
  }

  if (position === 'left') {
    content = assertExtra.left;
  }

  return content ? (
    <div className={`${prefixCls}-extra-content`} ref={ref}>
      {content}
    </div>
  ) : null;
};

if (process.env.NODE_ENV !== 'production') {
  ExtraContent.displayName = 'ExtraContent';
}

export default ExtraContent;
