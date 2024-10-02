import type { ChangeEvent } from 'react';
import { useState } from 'react';

export function usePassword() {
  const [errorClassName, setErrorClassName] = useState('');
  const [value, setValue] = useState('');
  const handlePressEnter = () => {
    if (value !== '123456') {
      setErrorClassName('shake-x');
    } else {
      console.log(222);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorClassName('');
  };
  return {
    errorClassName,
    value,
    handlePressEnter,
    handleChange,
  };
}
