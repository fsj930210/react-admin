import { useState, ChangeEvent } from 'react';

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
  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorClassName('');
  };
  return {
    errorClassName,
    value,
    handlePressEnter,
    handleChage,
  };
}
