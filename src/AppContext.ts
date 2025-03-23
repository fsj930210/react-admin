import React from 'react';

import { RA_ANTD_APP_CSS_TOKEN_KEY } from './utils/constants';

export type AppContext = {
  theme: 'light' | 'dark';
  appCssTokenKey: string;
};
export const AppContext = React.createContext<AppContext>({
  theme: 'light',
  appCssTokenKey: RA_ANTD_APP_CSS_TOKEN_KEY,
});
