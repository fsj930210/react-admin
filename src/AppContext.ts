import React from 'react';

// import type { MenuItem } from './types/custom-types';

export type AppContext = {
  theme: 'light' | 'dark';
  appCssTokenKey: string;
  // menuItems: MenuItem[];
  // flatMenuItems: MenuItem[];
};
export const AppContext = React.createContext<AppContext>({
  theme: 'light',
  appCssTokenKey: 'ra-css-var',
  // menuItems: [],
  // flatMenuItems: [],
});
