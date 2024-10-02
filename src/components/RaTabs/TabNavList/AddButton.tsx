import React from 'react';

import Icon from '@/components/Icon';

import type { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  style?: React.CSSProperties;
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(
  (props, ref) => {
    const { prefixCls, editable, locale, style } = props;
    if (!editable || editable.showAdd === false) {
      return null;
    }

    return (
      <button
        ref={ref}
        type="button"
        className={`${prefixCls}-nav-add`}
        style={style}
        aria-label={locale?.addAriaLabel || 'Add tab'}
        onClick={(event) => {
          editable.onEdit('add', { event });
        }}
      >
        {editable.addIcon || <Icon inline icon="lucide:plus" />}
      </button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  AddButton.displayName = 'AddButton';
}

export default AddButton;
