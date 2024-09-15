import { create } from 'zustand';

export type AppTheme = 'light' | 'dark' | 'system';
export interface GlobalState {
  primaryColor: string;
  appTheme: AppTheme;
  appLanguage: string;
  changeAppTheme: (theme: AppTheme) => void;
  changeAppLanguage: (lang: string) => void;
}

const useGlobalStore = create<GlobalState>()((set) => ({
  primaryColor: '#13c2c2',
  appTheme: 'light',
  appLanguage: navigator.language || 'zh-CN',
  changeAppTheme: (theme: AppTheme) => set(() => ({ appTheme: theme })),
  changeAppLanguage: (lang: string) => set(() => ({ appLanguage: lang })),
}));

export default useGlobalStore;
