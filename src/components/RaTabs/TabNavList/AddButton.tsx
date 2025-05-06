import type React from 'react';
import type { Ref } from 'react';

import Icon from '@/components/RaIcon';

import type { EditableConfig, TabsLocale } from '../interface';

export interface AddButtonProps {
  prefixCls: string;
  editable?: EditableConfig;
  locale?: TabsLocale;
  style?: React.CSSProperties;
  ref?: Ref<HTMLButtonElement>;
}

const AddButton = (props: AddButtonProps) => {
  const { prefixCls, editable, locale, style, ref } = props;
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
};

if (process.env.NODE_ENV !== 'production') {
  AddButton.displayName = 'AddButton';
}

export default AddButton;
