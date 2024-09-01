import React from 'react';
import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';

import { getRemovable } from '../util';

import AddButton from './AddButton';

import type { EditableConfig, Tab, TabsLocale, MoreProps } from '../interface';

export interface OperationNodeProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  tabs: Tab[];
  rtl: boolean;
  tabBarGutter?: number;
  activeKey: string;
  mobile: boolean;
  more?: MoreProps;
  editable?: EditableConfig;
  locale?: TabsLocale;
  removeAriaLabel?: string;
  tabMoving?: boolean;
  popupClassName?: string;
  hideAdd?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  onTabClick: (key: string, e: React.MouseEvent | React.KeyboardEvent) => void;
}

const OperationNode = React.forwardRef<HTMLDivElement, OperationNodeProps>(
  (props, ref) => {
    const {
      prefixCls,
      id,
      tabs,
      locale,
      mobile,
      more: moreProps = {},
      style,
      className,
      editable,
      tabBarGutter,
      rtl,
      removeAriaLabel,
      hideAdd,
      onTabClick,
      getPopupContainer,
      popupClassName,
    } = props;
    // ======================== Dropdown ========================
    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<string>('');

    const {
      icon: moreIcon = <Icon inline icon="ant-design:ellipsis-outlined" />,
    } = moreProps;

    const popupId = `${id}-more-popup`;
    const dropdownPrefix = `${prefixCls}-dropdown`;
    const selectedItemId =
      selectedKey !== '' ? `${popupId}-${selectedKey}` : '';

    const dropdownAriaLabel = locale?.dropdownAriaLabel;
    const menuItems = tabs.map((tab) => {
      const { closable, disabled, closeIcon, key, label, icon } = tab;
      const removable = getRemovable(closable, closeIcon, editable, disabled);
      return {
        key,
        icon,
        disabled,
        label: (
          <>
            <span>{label}</span>
            {removable && (
              <button
                type="button"
                aria-label={removeAriaLabel || 'remove'}
                tabIndex={0}
                className={`${dropdownPrefix}-menu-item-remove`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTab(e, key);
                }}
              >
                {closeIcon || editable?.removeIcon || (
                  <Icon inline icon="lucide:x" />
                )}
              </button>
            )}
          </>
        ),
      };
    });
    function onRemoveTab(
      event: React.MouseEvent | React.KeyboardEvent,
      key: string,
    ) {
      event.preventDefault();
      event.stopPropagation();
      editable?.onEdit?.('remove', { key, event });
    }

    function selectOffset(offset: -1 | 1) {
      const enabledTabs = tabs.filter((tab) => !tab.disabled);
      let selectedIndex =
        enabledTabs.findIndex((tab) => tab.key === selectedKey) || 0;
      const len = enabledTabs.length;

      for (let i = 0; i < len; i += 1) {
        selectedIndex = (selectedIndex + offset + len) % len;
        const tab = enabledTabs[selectedIndex];
        if (!tab.disabled) {
          setSelectedKey(tab.key);
          return;
        }
      }
    }

    function onKeyDown(e: React.KeyboardEvent) {
      const { which } = e;

      if (!open) {
        if ([KeyCode.DOWN, KeyCode.SPACE, KeyCode.ENTER].includes(which)) {
          setOpen(true);
          e.preventDefault();
        }
        return;
      }

      switch (which) {
        case KeyCode.UP:
          selectOffset(-1);
          e.preventDefault();
          break;
        case KeyCode.DOWN:
          selectOffset(1);
          e.preventDefault();
          break;
        case KeyCode.ESC:
          setOpen(false);
          break;
        case KeyCode.SPACE:
        case KeyCode.ENTER:
          if (selectedKey !== null) {
            onTabClick(selectedKey, e);
          }
          break;
      }
    }

    // ========================= Effect =========================
    useEffect(() => {
      // We use query element here to avoid React strict warning
      const ele = document.getElementById(selectedItemId);
      if (ele && ele.scrollIntoView) {
        ele.scrollIntoView(false);
      }
    }, [selectedKey]);

    useEffect(() => {
      if (!open) {
        setSelectedKey('');
      }
    }, [open]);

    // ========================= Render =========================
    const moreStyle: React.CSSProperties = {
      [rtl ? 'marginRight' : 'marginLeft']: tabBarGutter,
    };
    if (!tabs.length) {
      moreStyle.visibility = 'hidden';
      moreStyle.order = 1;
    }

    const overlayClassName = classNames({
      [`${dropdownPrefix}-rtl`]: rtl,
    });

    const moreNode: React.ReactNode = mobile ? null : (
      <Dropdown
        trigger={['click']}
        prefixCls={dropdownPrefix}
        menu={{
          items: menuItems,
          onClick: ({ key, domEvent }) => {
            console.log('Dropdown');
            onTabClick(key, domEvent);
            setOpen(false);
          },
          prefixCls: `${dropdownPrefix}-menu`,
          id: popupId,
          tabIndex: -1,
          role: 'listbox',
          selectedKeys: [selectedKey],
          'aria-activedescendant': selectedItemId,
          'aria-label':
            dropdownAriaLabel !== undefined
              ? dropdownAriaLabel
              : 'expanded dropdown',
        }}
        open={tabs.length ? open : false}
        onOpenChange={setOpen}
        overlayClassName={classNames(overlayClassName, popupClassName)}
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
        getPopupContainer={getPopupContainer}
        {...moreProps}
      >
        <button
          type="button"
          className={`${prefixCls}-nav-more`}
          style={moreStyle}
          tabIndex={-1}
          aria-hidden="true"
          aria-haspopup="listbox"
          aria-controls={popupId}
          id={`${id}-more`}
          aria-expanded={open}
          onKeyDown={onKeyDown}
        >
          {moreIcon}
        </button>
      </Dropdown>
    );

    return (
      <div
        className={classNames(`${prefixCls}-nav-operations`, className)}
        style={style}
        ref={ref}
      >
        {moreNode}
        {hideAdd ? null : (
          <AddButton
            prefixCls={prefixCls}
            locale={locale}
            editable={editable}
          />
        )}
      </div>
    );
  },
);
if (process.env.NODE_ENV !== 'production') {
  OperationNode.displayName = 'OperationNode';
}
const MemorizedOperationNode = React.memo(
  OperationNode,
  (_, next) =>
    // https://github.com/ant-design/ant-design/issues/32544
    // We'd better remove syntactic sugar in `rc-menu` since this has perf issue
    !!next.tabMoving,
);

export default MemorizedOperationNode;
