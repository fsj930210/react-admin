import type { ChangeEventHandler, ReactNode, CSSProperties } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import { Form } from 'antd';
import classNames from 'classnames';

import Icon from '@/components/RaIcon';
import './index.css';
import { RA_ANTD_APP_CSS_TOKEN_KEY } from '@/utils/constants';

export interface MaterialContainerProps {
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
        [RA_ANTD_APP_CSS_TOKEN_KEY]: true,
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

export default MaterialContainer;
