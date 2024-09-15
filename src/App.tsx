import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp, theme as antdTehme } from 'antd';
import dayjs from 'dayjs';

// for date-picker i18n
import 'dayjs/locale/zh-cn';
// import 'dayjs/locale/en';
import AppLoading from './components/AppLoading';
// import LockScreen from './components/LockScreen';
import useI18n from './hooks/useI18n';
import useTheme from './hooks/useTheme';
import router from './router';

import useGlobalStore from '@/store';

import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

export type AppContext = {
  theme: 'light' | 'dark';
  appCssTokenKey: string;
};
export const AppContext = React.createContext<AppContext>({
  theme: 'light',
  appCssTokenKey: 'ra-css-var',
});
const App = () => {
  const { antdLang } = useI18n();
  const { primaryColor } = useGlobalStore();
  const theme = useTheme();
  return (
    <AppContext.Provider value={{ theme, appCssTokenKey: 'ra-css-var' }}>
      <ConfigProvider
        locale={antdLang}
        theme={{
          cssVar: { key: 'ra-css-var' },
          hashed: false,
          algorithm:
            theme === 'dark'
              ? [antdTehme.darkAlgorithm]
              : [antdTehme.defaultAlgorithm],
          token: {
            colorPrimary: primaryColor,
            colorInfo: primaryColor,
            borderRadius: 4,
          },
          components: {
            Form: {
              itemMarginBottom: 14,
            },
            Layout: {
              headerHeight: 48,
            },
            Menu: {
              collapsedWidth: 48,
            },
          },
        }}
      >
        <AntApp className="w-full h-full">
          <Suspense fallback={<AppLoading showText />}>
            <RouterProvider router={router} fallbackElement={<AppLoading />} />
          </Suspense>
        </AntApp>
        {/* <LockScreen /> */}
      </ConfigProvider>
    </AppContext.Provider>
  );
};

export default App;
