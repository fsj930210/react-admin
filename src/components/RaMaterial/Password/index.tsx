import type { ReactNode } from 'react';
import { useState } from 'react';

import { useControllableValue } from 'ahooks';
import { Input } from 'antd';
import classNames from 'classnames';

import Icon from '@/components/Icon';

import MaterialContainer from '../Container';

import type { MaterialInputProps } from '../Input';

type MaterialPasswordProps = MaterialInputProps & {
  iconRender?: (visible: boolean) => ReactNode;
  visibilityToggle?: boolean;
};
const MaterialPassword = ({
  value,
  defaultValue,
  placeholder,
  visibilityToggle,
  onChange,
  onClear,
  iconRender,
  ...rest
}: MaterialPasswordProps) => {
  const [type, setType] = useState('password');
  const [state, setState] = useControllableValue({
    value,
    defaultValue,
    onChange,
  });
  return (
    <MaterialContainer
      placeholder={placeholder}
      value={value}
      onClear={() => {
        setState('');
        onClear?.();
      }}
      {...rest}
      suffix={null}
    >
      <>
        <Input
          className={classNames({
            'ra-material-input': true,
          })}
          variant="borderless"
          value={state}
          onChange={(e) => setState?.(e)}
          placeholder={placeholder || ''}
          type={type}
        />
        {visibilityToggle ? (
          <span
            className="ant-input-suffix"
            onClick={() =>
              setType((pre) => (pre === 'password' ? 'text' : 'password'))
            }
          >
            <span className="anticon ant-input-password-icon">
              {iconRender ? (
                iconRender(type === 'text')
              ) : type === 'password' ? (
                <Icon icon="ant-design:eye-invisible-outlined" />
              ) : (
                <Icon icon="ant-design:eye-outlined" />
              )}
            </span>
          </span>
        ) : null}
      </>
    </MaterialContainer>
  );
};

export default MaterialPassword;
