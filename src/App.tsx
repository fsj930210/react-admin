import React, { Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp, theme as antdTehme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import AppLoading from './components/AppLoading';
// import LockScreen from './components/LockScreen';
import router from './router';
import { setDarkCssVars, setLightCssVars } from './utils/theme';

import useGlobalStore from '@/store';

import 'dayjs/locale/zh-cn';
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
  const [theme, setTheme] = useState<AppContext['theme']>('light');
  const { primaryColor, appTheme } = useGlobalStore();
  // 这里处理是因为有些页面没有引入DarkTheme组件，全局监听
  useEffect(() => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function onThemeChange(e: MediaQueryListEvent) {
      if (e.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
    if (appTheme === 'system') {
      if (themeMedia.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
      themeMedia.addEventListener('change', onThemeChange);
    } else {
      themeMedia.removeEventListener('change', onThemeChange);
      setTheme(appTheme);
    }
  }, [appTheme]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
      setDarkCssVars();
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      setLightCssVars();
    }
  }, [theme]);
  return (
    <AppContext.Provider value={{ theme, appCssTokenKey: 'ra-css-var' }}>
      <ConfigProvider
        locale={zhCN}
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
