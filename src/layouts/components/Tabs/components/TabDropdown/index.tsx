import type React from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from 'antd';

import Icon from '@/components/Icon';
import type { Tab } from '@/components/RaTabs/interface';

import type { PopoverProps } from 'antd';

import useTabActions from '@/layouts/hooks/useTabsActions';

type TabDropdownProps = {
  children: React.ReactNode;
  trigger?: PopoverProps['trigger'];
  tab: Tab;
  updateTabItems: (updateFunc: (preItems: Tab[]) => Tab[]) => void;
};
const TabDropdown = ({
  children,
  tab,
  trigger = 'contextMenu',
  updateTabItems,
}: TabDropdownProps) => {
  const { t } = useTranslation();
  const { reloadFunc, pinFunc, deleteTab } = useTabActions({ updateTabItems });
  const content = (
    <ul className="pt-2 w-[200px]">
      <li
        className="px-2 py-1 cursor-pointer"
        onClick={() => deleteTab(tab.key)}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:x" />
          <span className="ml-2">{t('tabs.closeCurrent')}</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer" onClick={reloadFunc}>
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="ant-design:reload-outlined" />
          <span className="ml-2">{t('tabs.reload')}</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2]  hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:pin" />
          <span className="ml-2">{t('tabs.pin')}</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="carbon:new-tab" />
          <span className="ml-2">{t('tabs.openNewWindow')}</span>
        </div>
      </li>
      <li className="px-2 py-1 pb-2 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:fullscreen" />
          <span className="ml-2">{t('tabs.fullscreen')}</span>
        </div>
      </li>
      <li className="px-2 py-1 pt-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-left-to-line" />
          <span className="ml-2">{t('tabs.closeLeft')}</span>
        </div>
      </li>
      <li className="px-2 py-1 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-right-to-line" />
          <span className="ml-2">{t('tabs.closeRight')}</span>
        </div>
      </li>
      <li className="px-2 py-1 pt-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:fold-horizontal" />
          <span className="ml-2">{t('tabs.closeOther')}</span>
        </div>
      </li>
      <li className="px-2 py-1 pb-2 cursor-pointer">
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-left-right" />
          <span className="ml-2">{t('tabs.closeAll')}</span>
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
