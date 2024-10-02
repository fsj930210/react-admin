import React from 'react';

export type AppContext = {
  theme: 'light' | 'dark';
  appCssTokenKey: string;
};
export const AppContext = React.createContext<AppContext>({
  theme: 'light',
  appCssTokenKey: 'ra-css-var',
});
