import { create } from 'zustand';

import type { AnimationType } from '@/components/app/AppPageTransition';

import { createSelector } from './createSelector';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
  os = 'os',
}
export type LayoutType = 'vertical' | 'horizontal' | 'doubleColumn' | 'mixVertical' | 'mixDoubleColumn' | 'fullScreen' | 'side';
export interface AppConfigState {
  primaryColor: string;
  appTheme: AppThemeEnum;
  appLanguage: string;
  showBreadcrumb: boolean;
  showTabs: boolean;
  keepAlive: boolean;
  animationType: AnimationType;
  layoutType: LayoutType;
  changeAppTheme: (theme: AppThemeEnum) => void;
  changeAppLanguage: (lang: string) => void;
  changePrimaryColor: (color: string) => void;
  changeKeepAlive: (keepAlive: boolean) => void;
  changeShowBreadcrumb: (showBreadcrumb: boolean) => void;
  changeShowTabs: (showTabs: boolean) => void;
  changeAnimationType: (animationType: AnimationType) => void;
  changeLayoutType: (layout: LayoutType) => void;
}

const useAppConfigStore = create<AppConfigState>()((set) => ({
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
  animationType: 'fade',
  changeAnimationType: (animationType: AnimationType) =>
    set(() => ({ animationType })),
  layoutType: 'mixDoubleColumn',
  changeLayoutType: (layoutType: LayoutType) => set(() => ({ layoutType })),
}));

const useAppConfigStoreSelector = createSelector(useAppConfigStore);

export default useAppConfigStoreSelector;
