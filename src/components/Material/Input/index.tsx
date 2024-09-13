import {
  ChangeEventHandler,
  useLayoutEffect,
  ReactNode,
  useRef,
  useState,
  CSSProperties,
} from 'react';

import { Icon } from '@iconify/react';
import { useControllableValue } from 'ahooks';
import { Form, Input } from 'antd';
import classNames from 'classnames';
import 'antd/es/input/style/index.js';
import './index.css';

interface MaterialContainerProps {
  variant?: 'outlined' | 'standard' | 'filled';
  label?: ReactNode;
  type?: 'text' | 'password' | 'textarea';
  value?: string;
  defaultValue?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  children?: ReactNode;
  allowClear?: boolean | { clearIcon: ReactNode };
  style?: CSSProperties;
  className?: string;
  onChange?: ChangeEventHandler;
  onClear?: () => void;
}
const MaterialContainer = ({
  variant = 'outlined',
  placeholder,
  label,
  prefix,
  suffix,
  style,
  className,
  value,
  allowClear,
  onClear,
  children,
}: MaterialContainerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { status } = Form.Item.useStatus();
  const [labelLeft, setLabelLeft] = useState(prefix ? 32 : 0);
  useLayoutEffect(() => {
    setTimeout(() => {
      const wrapperLeft =
        wrapperRef.current?.getBoundingClientRect()?.left || 0;
      const input = wrapperRef.current?.querySelector('.ra-material-input');
      const inputLeft = input?.getBoundingClientRect()?.left || 0;
      setLabelLeft(inputLeft - wrapperLeft);
    }, 200);
  }, []);
  return (
    <div
      className={classNames({
        [`ant-input-${variant}`]: true,
        [`ra-material-input-${variant}`]: true,
        [`ant-input-status-${status}`]: !!status,
        'ant-input-affix-wrapper': true,
        'ra-material-input-wrapper': true,
        'ant-input-css-var': true,
        'ra-css-var': true,
        [`ra-material-input-status-${status}`]: !!status,
        [className as string]: !!className,
      })}
      ref={wrapperRef}
      style={style}
    >
      {prefix ? <span className="ant-input-prefix">{prefix}</span> : null}

      {children}
      <label className="ra-material-input-label" style={{ left: labelLeft }}>
        {label || placeholder}
      </label>
      {allowClear ? (
        typeof allowClear === 'boolean' ? (
          value ? (
            <span className="ant-input-suffix" onClick={onClear}>
              <span className="ant-input-clear-icon" role="button">
                <span className="anticon anticon-close-circle">
                  <Icon icon="ant-design:close-circle-filled" />
                </span>
              </span>
            </span>
          ) : null
        ) : value ? (
          <span className="ant-input-suffix" onClick={onClear}>
            <span className="ant-input-clear-icon" role="button">
              <span className="anticon anticon-close-circle">
                {allowClear.clearIcon}
              </span>
            </span>
          </span>
        ) : null
      ) : null}
      {suffix ? <span className="ant-input-suffix">{suffix}</span> : null}
    </div>
  );
};

type MaterialInputProps = Omit<MaterialContainerProps, 'children'>;

const MaterialInput = ({
  value,
  defaultValue,
  placeholder,
  onChange,
  onClear,
  ...rest
}: MaterialInputProps) => {
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
    >
      <Input
        className={classNames({
          'ra-material-input': true,
        })}
        variant="borderless"
        value={state}
        onChange={(e) => setState?.(e)}
        placeholder={placeholder || ''}
      />
    </MaterialContainer>
  );
};
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
type MaterialTextAreaProps = MaterialInputProps & {
  cols?: number;
  rows?: number;
};
const MaterialTextArea = ({
  value,
  defaultValue,
  placeholder,
  cols,
  rows = 2,
  onClear,
  onChange,
  ...rest
}: MaterialTextAreaProps) => {
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
      prefix=""
      suffix=""
    >
      <textarea
        className={classNames({
          'ant-input': true,
          'ra-material-input': true,
          'ra-material-textarea': true,
        })}
        placeholder={placeholder}
        value={state}
        onChange={setState}
        defaultValue={defaultValue}
        cols={cols}
        rows={rows}
      />
    </MaterialContainer>
  );
};
MaterialInput.Password = MaterialPassword;
MaterialInput.TextArea = MaterialTextArea;
export default MaterialInput;
