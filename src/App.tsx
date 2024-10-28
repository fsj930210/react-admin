// import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import localforage from 'localforage';

// for date-picker i18n
import 'dayjs/locale/zh-cn';
import { AppContext } from './AppContext';
import AppLoading from './components/app/AppLoading';
// import LockScreen from './components/LockScreen';
import { useBrowserLanguage } from './hooks/useBrowserLanguage';
import useColors from './hooks/useColors';
import useI18n from './hooks/useI18n';
import useTheme from './hooks/useTheme';
import router from './router';

import useGlobalStore from '@/store';

import 'antd/dist/reset.css';

dayjs.locale('zh-cn');
localforage.config({
  name: 'react_admin_database',
  storeName: 'react_admin_store',
});

const App = () => {
  useBrowserLanguage();
  useColors();
  const { antdLanguage } = useI18n();
  const { primaryColor } = useGlobalStore();
  const theme = useTheme();
  return (
    <AppContext.Provider value={{ theme, appCssTokenKey: 'ra-css-var' }}>
      <ConfigProvider
        locale={antdLanguage}
        theme={{
          cssVar: { key: 'ra-css-var' },
          hashed: false,
          algorithm:
            theme === 'dark'
              ? [antdTheme.darkAlgorithm]
              : [antdTheme.defaultAlgorithm],
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
          <RouterProvider router={router} fallbackElement={<AppLoading />} />
        </AntApp>
        {/* <LockScreen /> */}
      </ConfigProvider>
    </AppContext.Provider>
  );
};

export default App;
