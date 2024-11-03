import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useShallow } from 'zustand/react/shallow';

import { AppContext } from './AppContext';
// import LockScreen from './components/LockScreen';
import { useBrowserLanguage } from './hooks/useBrowserLanguage';
import useColors from './hooks/useColors';
import useI18n from './hooks/useI18n';
import useTheme from './hooks/useTheme';
import router from './router';

import useGlobalStore from '@/store';

import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

const App = () => {
  useBrowserLanguage();
  useColors();
  const { antdLanguage } = useI18n();
  const { primaryColor } = useGlobalStore(
    useShallow((state) => ({
      primaryColor: state.primaryColor,
    })),
  );
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
          <RouterProvider router={router} />
        </AntApp>
        {/* <LockScreen /> */}
      </ConfigProvider>
    </AppContext.Provider>
  );
};

export default App;
