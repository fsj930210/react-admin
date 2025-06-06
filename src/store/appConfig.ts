import { create } from 'zustand';

import type { AnimationType } from '@/components/RaAnimator';

import { createSelector } from './createSelector';

export enum AppThemeEnum {
  light = 'light',
  dark = 'dark',
  os = 'os',
}
export type LayoutType =
  | 'vertical'
  | 'horizontal'
  | 'doubleColumn'
  | 'mixVertical'
  | 'mixDoubleColumn'
  | 'fullScreen'
  | 'side';
export type BreadcrumbType = 'menu' | 'flat';
export interface AppConfigState {
  primaryColor: string;
  appTheme: AppThemeEnum;
  appLanguage: string;
  keepAlive: boolean;
  pageTransitionType: AnimationType;
  changeAppTheme: (theme: AppThemeEnum) => void;
  changeAppLanguage: (lang: string) => void;
  changePrimaryColor: (color: string) => void;
  changeKeepAlive: (keepAlive: boolean) => void;
  changePageTransitionType: (animationType: AnimationType) => void;
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
  pageTransitionType: 'fadeRight',
  changePageTransitionType: (pageTransitionType: AnimationType) =>
    set(() => ({ pageTransitionType })),
}));

const useAppConfigStoreSelector = createSelector(useAppConfigStore);

export default useAppConfigStoreSelector;
