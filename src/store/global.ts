import { create } from 'zustand';

import { createSelector } from './createSelector';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
  os = 'os',
}

export interface GlobalState {
  primaryColor: string;
  appTheme: AppThemeEnum;
  appLanguage: string;
  showBreadcrumb: boolean;
  showTabs: boolean;
  keepAlive: boolean; // 是否需要缓存页面
  changeAppTheme: (theme: AppThemeEnum) => void;
  changeAppLanguage: (lang: string) => void;
  changePrimaryColor: (color: string) => void;
  changeKeepAlive: (keepAlive: boolean) => void;
  changeShowBreadcrumb: (showBreadcrumb: boolean) => void;
  changeShowTabs: (showTabs: boolean) => void;
}

const useGlobalStore = create<GlobalState>()((set) => ({
  primaryColor: '#1677FF',
  changePrimaryColor: (color: string) => set(() => ({ primaryColor: color })),
  appTheme: AppThemeEnum.light,
  changeAppTheme: (theme: AppThemeEnum) =>
    set(() => ({ appTheme: AppThemeEnum[theme] })),
  appLanguage: navigator.language || 'zh-CN',
  changeAppLanguage: (lang: string) => set(() => ({ appLanguage: lang })),
  keepAlive: false,
  changeKeepAlive: (keepAlive: boolean) => set(() => ({ keepAlive })),
  showBreadcrumb: true,
  changeShowBreadcrumb: (showBreadcrumb: boolean) =>
    set(() => ({ showBreadcrumb })),
  showTabs: true,
  changeShowTabs: (showTabs: boolean) => set(() => ({ showTabs })),
}));

const useGlobalStoreSelector = createSelector(useGlobalStore);

export default useGlobalStoreSelector;
