import { cloneElement } from 'react';

import { Input } from 'antd';
import isFunction from 'lodash-es/isFunction';

import useComposition from './hooks/useComposition';

import type { InputProps } from 'antd/lib';
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/lib/input';

export type NormalizeTriggerType = ('onBlur' | 'onPressEnter')[];
interface RaCompositionBasicProps<T> {
  normalizeTrigger?: NormalizeTriggerType;
  normalize?: (value: string) => string;
  children: React.ReactElement<T>;
}

export type RaCompositionInputProps = RaCompositionBasicProps<InputProps> &
  InputProps;
export type RaCompositionPasswordProps =
  RaCompositionBasicProps<PasswordProps> & PasswordProps;
export type RaCompositionSearchProps = RaCompositionBasicProps<SearchProps> &
  SearchProps;
export type RaCompositionTextAreaProps =
  RaCompositionBasicProps<TextAreaProps> & TextAreaProps;

type RaCompositionProps =
  | RaCompositionInputProps
  | RaCompositionPasswordProps
  | RaCompositionSearchProps
  | RaCompositionTextAreaProps;
const RaComposition = ({
  value,
  maxLength,
  normalizeTrigger = ['onBlur'],
  children,
  normalize,
  onChange,
  onKeyDown,
  onPressEnter,
  ...rest
}: RaCompositionProps) => {
  const normalizeHandler = (type: NormalizeTriggerType[number]) => {
    let handler;
    if (
      Array.isArray(normalizeTrigger) &&
      normalizeTrigger.indexOf(type) > -1 &&
      isFunction(normalize)
    ) {
      handler = normalize;
    }
    return handler;
  };
  const {
    compositionValue,
    valueChangeHandler,
    compositionHandler,
    keyDownHandler,
    triggerValueChangeCallback,
  } = useComposition({
    value: value as any,
    maxLength,
    onChange: onChange as any,
    onKeyDown,
    onPressEnter: onPressEnter as any,
    normalizeHandler,
  });
  const inputProps: Omit<RaCompositionProps, 'children'> = {
    value: compositionValue || value,
    maxLength,
    onKeyDown: keyDownHandler,
    onChange: valueChangeHandler,
    onCompositionStart: (e: any) => {
      rest.onCompositionStart?.(e);
      compositionHandler(e);
    },
    onCompositionUpdate: (e: any) => {
      rest.onCompositionUpdate?.(e);
      compositionHandler(e);
    },
    onCompositionEnd: (e: any) => {
      rest.onCompositionEnd?.(e);
      compositionHandler(e);
    },
    onBlur: (e: any) => {
      rest.onBlur?.(e);
      const normalize = normalizeHandler('onBlur');
      if (normalize) {
        triggerValueChangeCallback?.(e);
      }
    },
    ...rest,
  };
  // @ts-ignore
  return cloneElement(children as React.ReactElement<any>, {
    ...(inputProps as any),
  });
};

export const RaCompositionInput = (
  props: Omit<RaCompositionInputProps, 'children'>,
) => (
  <RaComposition {...props}>
    <Input />
  </RaComposition>
);
export const RaCompositionPassword = (
  props: Omit<RaCompositionPasswordProps, 'children'>,
) => (
  <RaComposition {...props}>
    <Input.Password />
  </RaComposition>
);
export const RaCompositionSearch = (
  props: Omit<RaCompositionSearchProps, 'children'>,
) => (
  <RaComposition {...props}>
    <Input.Search />
  </RaComposition>
);
export const RaCompositionTextArea = (
  props: Omit<RaCompositionTextAreaProps, 'children'>,
) => (
  <RaComposition {...props}>
    <Input.TextArea />
  </RaComposition>
);
