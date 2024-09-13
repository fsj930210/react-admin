import React from 'react';

import { Icon } from '@iconify/react';
import { Popover } from 'antd';

import type { PopoverProps } from 'antd';
type TabDropdownProps = {
  children: React.ReactNode;
  trigger?: PopoverProps['trigger'];
};
const TabDropdown = ({
  children,
  trigger = ['contextMenu'],
}: TabDropdownProps) => {
  const content = (
    <ul className="pt-2 w-[140px]">
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:x" />
          <span className="ml-2">关闭当前标签</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="ant-design:reload-outlined" />
          <span className="ml-2">重新加载</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2]  hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:pin" />
          <span className="ml-2">固定</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="carbon:new-tab" />
          <span className="ml-2">在新窗口打开</span>
        </div>
      </li>
      <li className="px-2 py-1 pb-2 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:fullscreen" />
          <span className="ml-2">全屏浏览</span>
        </div>
      </li>
      <li className="px-2 py-1 pt-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-left-to-line" />
          <span className="ml-2">关闭左侧标签</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-right-to-line" />
          <span className="ml-2">关闭右侧标签</span>
        </div>
      </li>
      <li className="px-2 py-1 pt-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:fold-horizontal" />
          <span className="ml-2">关闭其他标签</span>
        </div>
      </li>
      <li className="px-2 py-1 pb-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-left-right" />
          <span className="ml-2">关闭所有标签</span>
        </div>
      </li>
    </ul>
  );
  return (
    <Popover
      trigger={trigger}
      content={content}
      arrow={false}
      overlayInnerStyle={{ padding: 0 }}
    >
      {children}
    </Popover>
  );
};

export default TabDropdown;
