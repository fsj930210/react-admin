import React from 'react';

import Icon from '@/components/Icon';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';

import { genDataNodeKey, getRemovable } from '../util';

import type { EditableConfig, Tab } from '../interface';

export interface TabNodeProps {
  id?: string;
  prefixCls: string;
  tab: Tab;
  active: boolean;
  closable?: boolean;
  editable?: EditableConfig;
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onResize?: (width: number, height: number, left: number, top: number) => void;
  renderWrapper?: (
    node: React.ReactElement,
    props: Omit<TabNodeProps, 'renderWrapper'>,
    nodeKey: string,
  ) => React.ReactElement;
  removeAriaLabel?: string;
  removeIcon?: React.ReactNode;
  // onFocus: React.FocusEventHandler;
  style?: React.CSSProperties;
}

const TabNode: React.FC<TabNodeProps> = (props) => {
  const {
    prefixCls,
    id,
    active,
    tab: { key, label, disabled, closeIcon, icon },
    closable,
    renderWrapper,
    removeAriaLabel,
    editable,
    onClick,
    // onFocus,
    style,
  } = props;
  const tabPrefix = `${prefixCls}-tab`;

  const removable = getRemovable(closable, closeIcon, editable, disabled);

  function onInternalClick(e: React.MouseEvent | React.KeyboardEvent) {
    if (disabled) {
      return;
    }
    onClick?.(e);
  }

  function onRemoveTab(event: React.MouseEvent | React.KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    editable?.onEdit?.('remove', { key, event });
  }

  const labelNode = React.useMemo<React.ReactNode>(
    () => (icon && typeof label === 'string' ? <span>{label}</span> : label),
    [label, icon],
  );

  const node: React.ReactElement = (
    <div
      key={key}
      // ref={ref}
      data-node-key={genDataNodeKey(key)}
      className={classNames(tabPrefix, {
        [`${tabPrefix}-with-remove`]: removable,
        [`${tabPrefix}-active`]: active,
        [`${tabPrefix}-disabled`]: disabled,
      })}
      style={style}
      onClick={onInternalClick}
      onKeyDown={(e) => {
        if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
          e.preventDefault();
          onInternalClick(e);
        }
      }}
      // onFocus={onFocus}
    >
      {/* Primary Tab Button */}
      <div
        role="tab"
        aria-selected={active}
        id={id && `${id}-tab-${key}`}
        className={`${tabPrefix}-content`}
        aria-controls={id && `${id}-panel-${key}`}
        aria-disabled={disabled}
        tabIndex={disabled ? undefined : 0}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   onInternalClick(e);
        // }}
      >
        {icon ? (
          <span className={`${tabPrefix}-icon`}>
            {typeof icon === 'string' ? <Icon inline icon={icon} /> : icon}
          </span>
        ) : null}
        {label && labelNode}
      </div>

      {/* Remove Button */}
      {removable && (
        <button
          type="button"
          aria-label={removeAriaLabel || 'remove'}
          tabIndex={0}
          className={`${tabPrefix}-remove`}
          onClick={(e) => {
            e.stopPropagation();
            onRemoveTab(e);
          }}
        >
          {closeIcon || editable?.removeIcon || <Icon inline icon="lucide:x" />}
        </button>
      )}
    </div>
  );

  return renderWrapper ? renderWrapper(node, props, genDataNodeKey(key)) : node;
};

export default TabNode;
