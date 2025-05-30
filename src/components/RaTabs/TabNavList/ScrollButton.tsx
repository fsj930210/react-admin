import React from 'react';
import type { Ref } from 'react';

import { Button } from 'antd';

import Icon from '@/components/RaIcon';

import type {
  TabBarScrollButtonContent,
  TabBarScrollButtonMap,
  TabBarScrollButtonPosition,
} from '../interface';

interface ScrollButtonProps {
  position: TabBarScrollButtonPosition;
  prefixCls: string;
  content?: TabBarScrollButtonContent;
  disabled?: boolean;
  show?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  ref?: Ref<HTMLDivElement>;
}

const ScrollButton = (props: ScrollButtonProps) => {
  const {
    position,
    prefixCls,
    disabled,
    onClick,
    show,
    content: propsContent,
    ref,
  } = props;
  if (!show) {
    return null;
  }

  const defaultContent: TabBarScrollButtonMap = {
    right: (
      <Button
        icon={<Icon icon="lucide:chevron-right" />}
        className={`${prefixCls}-scroll-button`}
        disabled={disabled}
      />
    ),
    left: (
      <Button
        className={`${prefixCls}-scroll-button`}
        disabled={disabled}
        icon={<Icon icon="lucide:chevron-left" />}
      />
    ),
  };
  let content: React.ReactNode;

  // Parse extra
  let assertScrollButton: TabBarScrollButtonMap = {};
  if (typeof propsContent === 'object' && !React.isValidElement(propsContent)) {
    assertScrollButton = propsContent as TabBarScrollButtonMap;
  }

  if (position === 'right') {
    content = assertScrollButton.right || defaultContent.right;
  }

  if (position === 'left') {
    content = assertScrollButton.left || defaultContent.left;
  }

  return content ? (
    <div
      className={`${prefixCls}-scroll-button-wrapper`}
      ref={ref}
      onClick={onClick}
    >
      {content}
    </div>
  ) : null;
};

if (process.env.NODE_ENV !== 'production') {
  ScrollButton.displayName = 'ScrollButton';
}

export default ScrollButton;
