import { create } from 'zustand';

export type FormPageProps = {
  material?: boolean;
  switchPage?: (page: LoginPageEnum) => void;
};

export enum LoginStyleEnum {
  ant = 'ant',
  material = 'material',
  modal = 'modal',
}

export enum LoginPageEnum {
  login = 1,
  register,
  reset_password,
  qr_code,
  email,
}

interface LoginState {
  loginStyle: LoginStyleEnum;
  loginPage: LoginPageEnum;
  changeLoginPage: (page: LoginPageEnum) => void;
  changeLoginStyle: (style: LoginStyleEnum) => void;
}

const useLoginStore = create<LoginState>()((set) => ({
  loginStyle: LoginStyleEnum.ant,
  loginPage: LoginPageEnum.login,
  changeLoginStyle: (style) => set(() => ({ loginStyle: style })),
  changeLoginPage: (page) => set(() => ({ loginPage: page })),
}));

export default useLoginStore;
