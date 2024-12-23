import { useControllableValue } from 'ahooks';
import { Input } from 'antd';
import classNames from 'classnames';

import MaterialContainer from '../Container';
import MaterialPassword from '../Password';
import MaterialTextArea from '../TextArea';

import type { MaterialContainerProps } from '../Container';

export type MaterialInputProps = Omit<MaterialContainerProps, 'children'>;

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

MaterialInput.Password = MaterialPassword;
MaterialInput.TextArea = MaterialTextArea;
export default MaterialInput;
