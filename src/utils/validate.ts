import type { RuleObject } from 'antd/lib/form';

const passwordReg = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,12}$/;
const usernameReg = /^[a-zA-Z][a-zA-Z0-9]{2,32}$/;
const phoneNumberReg = /^1\d{10}$/;
export const validatePassword = (
  _rule: RuleObject,
  value: string,
  errorMsg: string,
) => {
  if (value && !passwordReg.test(value)) {
    return Promise.reject(
      // '密码由字母、数字、特殊字符，任意2种组成，长度6-12位',
      errorMsg,
    );
  }
  return Promise.resolve();
};
export const validateUsername = (
  _rule: RuleObject,
  value: string,
  errorMsg: string,
) => {
  if (value && !usernameReg.test(value)) {
    return Promise.reject(
      // '用户名由字母、数字组成，且首位不能为数字，长度3-32位',
      errorMsg,
    );
  }
  return Promise.resolve();
};
export const validatePhoneNumber = (
  _rule: RuleObject,
  value: string,
  errorMsg: string,
) => {
  if (value && !phoneNumberReg.test(value)) {
    return Promise.reject(errorMsg);
  }
  return Promise.resolve();
};
