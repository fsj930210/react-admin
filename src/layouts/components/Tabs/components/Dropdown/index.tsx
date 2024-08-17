import React from 'react';

import { Dropdown } from 'antd';

import type { DropdownProps, MenuProps } from 'antd';
type TabDropdownProps = {
  children: React.ReactNode;
  trigger?: DropdownProps['trigger'];
};
const TabDropdown = ({
  children,
  trigger = ['contextMenu'],
}: TabDropdownProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div>关闭当前标签</div>,
    },
    {
      key: '2',
      label: <div>重新加载</div>,
    },
    {
      key: '3',
      label: <div>在新窗口打开</div>,
    },
    {
      key: '4',
      label: <div>固定当前标签</div>,
    },
    {
      key: '5',
      label: <div>全屏浏览</div>,
    },
    {
      key: '6',
      label: <div>关闭左侧标签</div>,
    },
    {
      key: '7',
      label: <div>关闭右侧标签</div>,
    },
    {
      key: '8',
      label: <div>关闭其他标签</div>,
    },
    {
      key: '9',
      label: <div>关闭所有标签</div>,
    },
  ];
  return (
    <Dropdown trigger={trigger} menu={{ items }}>
      {children}
    </Dropdown>
  );
};

export default TabDropdown;
