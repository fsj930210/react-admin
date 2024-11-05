import { create } from 'zustand';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
  os = 'os',
}

export interface GlobalState {
  primaryColor: string;
  appTheme: AppThemeEnum;
  appLanguage: string;
  changeAppTheme: (theme: AppThemeEnum) => void;
  changeAppLanguage: (lang: string) => void;
  changePrimaryColor: (color: string) => void;
}

const useGlobalStore = create<GlobalState>()((set) => ({
  primaryColor: '#1677FF',
  appTheme: AppThemeEnum.light,
  appLanguage: navigator.language || 'zh-CN',
  changeAppTheme: (theme: AppThemeEnum) =>
    set(() => ({ appTheme: AppThemeEnum[theme] })),
  changeAppLanguage: (lang: string) => set(() => ({ appLanguage: lang })),
  changePrimaryColor: (color: string) => set(() => ({ primaryColor: color })),
}));

export default useGlobalStore;
