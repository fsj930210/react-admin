import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Popover } from 'antd';

import Icon from '@/components/RaIcon';
import type { Tab } from '@/components/RaTabs/interface';

import useTabActions from '../../hooks/useTabsActions';

import type { PopoverProps } from 'antd';

import useTabsStoreSelector from '@/store/tabs';

type TabDropdownProps = {
  children: React.ReactNode;
  trigger?: PopoverProps['trigger'];
  tab?: Tab;
  index: number;
  updateTabItems: (updateFunc: (prevTabItems: Tab[]) => Tab[]) => void;
};
const TabDropdown = ({
  children,
  tab,
  trigger = 'contextMenu',
  index,
  updateTabItems,
}: TabDropdownProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const doTabActions = (callback?: (...arg: any[]) => void) => {
    callback?.();
    setOpen(false);
  };
  const {
    reloadTabFunc,
    togglePinTabFunc,
    deleteTabFunc,
    openNewWindowFunc,
    toggleFullscreenFunc,
    deleteAllFunc,
    deleteOtherTabsFunc,
    deleteTabsByKeysFunc,
    isFullscreen,
  } = useTabActions({
    updateTabItems,
  });
  const tabItems = useTabsStoreSelector((state) => state.tabItems);
  const disabledClassName = 'layout-tabs-tab-dropdown-disabled';
  const closeCurrentDisabled = () => {
    return tab?.closable ? '' : disabledClassName;
  };
  const closeLeftDisabled = () => {
    let disabled = false;
    if (index === 0) {
      disabled = true;
    } else {
      const prevItems = tabItems.slice(0, index);
      if (prevItems.every((i) => !i.closable)) {
        disabled = true;
      }
    }
    return disabled ? disabledClassName : '';
  };
  const closeRightDisabled = () => {
    let disabled = false;
    if (index === tabItems.length - 1) {
      disabled = true;
    } else {
      const nextItems = tabItems.slice(index + 1, tabItems.length);
      if (nextItems.every((i) => !i.closable)) {
        disabled = true;
      }
    }
    return disabled ? disabledClassName : '';
  };
  const closeOtherDisabled = () => {
    let disabled = false;
    const newTabItems = [...tabItems];
    newTabItems.splice(index, 1);
    if (newTabItems.every((i) => !i.closable)) {
      disabled = true;
    }
    return disabled ? disabledClassName : '';
  };
  const closeAllDisabled = () => {
    let disabled = false;
    if (tabItems.every((i) => !i.closable)) {
      disabled = true;
    }
    return disabled ? disabledClassName : '';
  };
  const content = (
    <ul className="pt-2 w-[200px]">
      <li
        className={`px-2 py-1 cursor-pointer ${closeCurrentDisabled}`}
        onClick={() => doTabActions(() => deleteTabFunc(tab!.key))}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:x" />
          <span className="ml-2">{t('tabs.closeCurrent')}</span>
        </div>
      </li>
      <li
        className="px-2 py-1 cursor-pointer"
        onClick={() => doTabActions(() => reloadTabFunc(tab!.key))}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="ant-design:reload-outlined" />
          <span className="ml-2">{t('tabs.reload')}</span>
        </div>
      </li>
      <li
        className="px-2 py-1 cursor-pointer"
        onClick={() => doTabActions(() => togglePinTabFunc(tab!))}
      >
        <div className="flex items-center p-[2]  hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          {tab?.pin ? (
            <>
              <Icon icon="lucide:pin-off" />
              <span className="ml-2">{t('tabs.cancelPin')}</span>
            </>
          ) : (
            <>
              <Icon icon="lucide:pin" />
              <span className="ml-2">{t('tabs.pin')}</span>
            </>
          )}
        </div>
      </li>
      <li
        className="px-2 py-1 cursor-pointer"
        onClick={() => doTabActions(() => openNewWindowFunc(tab!))}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="carbon:new-tab" />
          <span className="ml-2">{t('tabs.openNewWindow')}</span>
        </div>
      </li>
      <li
        className="px-2 py-1 pb-2 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1"
        onClick={() => doTabActions(() => toggleFullscreenFunc())}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          {isFullscreen ? (
            <Icon icon="ant-design:fullscreen-exit-outlined" />
          ) : (
            <Icon icon="lucide:fullscreen" />
          )}
          <span className="ml-2">{t('tabs.fullScreen')}</span>
        </div>
      </li>
      <li
        className={`px-2 py-1 pt-2 cursor-pointer ${closeLeftDisabled}`}
        onClick={() =>
          doTabActions(() => deleteTabsByKeysFunc(tab!.key, 'left'))
        }
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-left-to-line" />
          <span className="ml-2">{t('tabs.closeLeft')}</span>
        </div>
      </li>
      <li
        className={`px-2 py-1 cursor-pointer border-b-solid border-b-[var(--ant-color-border)] border-b-1 ${closeRightDisabled}`}
        onClick={() =>
          doTabActions(() => deleteTabsByKeysFunc(tab!.key, 'right'))
        }
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:arrow-right-to-line" />
          <span className="ml-2">{t('tabs.closeRight')}</span>
        </div>
      </li>
      <li
        className={`px-2 py-1 pt-2 cursor-pointer ${closeOtherDisabled}`}
        onClick={() => doTabActions(() => deleteOtherTabsFunc(tab!.key))}
      >
        <div className="flex items-center p-[2] hover:bg-[var(--ant-color-bg-layout)] rounded-[4px]">
          <Icon icon="lucide:fold-horizontal" />
          <span className="ml-2">{t('tabs.closeOther')}</span>
        </div>
      </li>
      <li
        className={`px-2 py-1 pb-2 cursor-pointer ${closeAllDisabled}`}
        onClick={() => doTabActions(() => deleteAllFunc())}
      >
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
      styles={{
        body: {
          padding: 0,
        },
      }}
      open={open}
      onOpenChange={(v) => setOpen(v)}
    >
      {children}
    </Popover>
  );
};

export default TabDropdown;
