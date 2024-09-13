import { create } from 'zustand';

export type AppTheme = 'light' | 'dark' | 'system';

export interface GlobalState {
  primaryColor: string;
  appTheme: AppTheme;
  changeAppTheme: (theme: AppTheme) => void;
}

const useGloabalStore = create<GlobalState>()((set) => ({
  primaryColor: '#13c2c2',
  appTheme: 'light',
  changeAppTheme: (theme: AppTheme) => set(() => ({ appTheme: theme })),
}));

export default useGloabalStore;
