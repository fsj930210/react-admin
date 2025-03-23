import type {
  ChangeEventHandler,
  CompositionEventHandler,
  KeyboardEventHandler,
} from 'react';
import { useRef, useState } from 'react';

import type { NormalizeTriggerType } from '..';
import type { InputProps } from 'antd/lib';
import type { TextAreaProps } from 'antd/lib/input';
// Handle input text like Chinese
function useComposition({
  value,
  maxLength,
  onChange,
  onKeyDown,
  onPressEnter,
  beforeTriggerValueChangeCallback,
  normalizeHandler,
}: {
  value: string | undefined;
  maxLength?: number;
  onChange: InputProps['onChange'];
  onKeyDown: InputProps['onKeyDown'] | TextAreaProps['onKeyDown'];
  onPressEnter: InputProps['onPressEnter'];
  beforeTriggerValueChangeCallback?: (newValue: string) => void;
  normalizeHandler?: (
    type: NormalizeTriggerType[number],
  ) => ((value: string) => string) | undefined;
}): {
  compositionValue: string | undefined;
  triggerValueChangeCallback: typeof onChange;
  compositionHandler: CompositionEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  valueChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  keyDownHandler: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} {
  const refIsComposition = useRef(false);
  const [compositionValue, setCompositionValue] = useState<string | undefined>(
    undefined,
  );

  const triggerValueChangeCallback: typeof onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    if (beforeTriggerValueChangeCallback) {
      beforeTriggerValueChangeCallback(newValue);
    }

    if (
      onChange &&
      // https://github.com/arco-design/arco-design/issues/520
      // Avoid triggering onChange repeatedly for the same value
      // compositionend is earlier than onchange in Firefox, different with chrome
      newValue !== value &&
      (maxLength === undefined || newValue.length <= maxLength)
    ) {
      onChange(e);
    }
  };

  return {
    compositionValue,
    triggerValueChangeCallback,
    compositionHandler: (e: any) => {
      refIsComposition.current = e.type !== 'compositionend';
      if (!refIsComposition.current) {
        console.log('compositionend');
        setCompositionValue(undefined);
        triggerValueChangeCallback(e);
      }
    },
    valueChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // console.log('onChange', refIsComposition.current, newValue);
      if (!refIsComposition.current) {
        if (compositionValue) {
          setCompositionValue(undefined);
        }
        triggerValueChangeCallback(e);
      } else {
        // https://github.com/arco-design/arco-design/issues/397
        // compositionupdate => onchange
        refIsComposition.current = false;
        setCompositionValue(newValue);
      }
    },
    keyDownHandler: (e: any) => {
      const keyCode = e.keyCode || e.which;

      if (!refIsComposition.current) {
        if (onKeyDown) {
          onKeyDown(e);
        }
        if (keyCode === 13) {
          if (onPressEnter) {
            onPressEnter(e);
          }
          const normalize = normalizeHandler?.('onPressEnter');
          if (normalize) {
            triggerValueChangeCallback(e);
          }
        }
      }
    },
  };
}

export default useComposition;
