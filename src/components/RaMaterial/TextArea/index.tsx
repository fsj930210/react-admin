import { useControllableValue } from 'ahooks';
import classNames from 'classnames';

import MaterialContainer from '../Container';

import type { MaterialInputProps } from '../Input';

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

export default MaterialTextArea;
