import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import useI18n from '@/components/business/I18n/useI18n';

import { AppContext } from './AppContext';
// import LockScreen from './components/LockScreen';
import useColors from './hooks/useColors';
import useTheme from './hooks/useTheme';
import router from './router';
import { RA_ANTD_APP_CSS_TOKEN_KEY } from './utils/constants';

import useGlobalStoreSelector from '@/store/global';

import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

const App = () => {
  useColors();
  const { antdLanguage } = useI18n();
  const { primaryColor } = useGlobalStoreSelector('primaryColor');
  const theme = useTheme();

  return (
    <AppContext.Provider
      value={{ theme, appCssTokenKey: RA_ANTD_APP_CSS_TOKEN_KEY }}
    >
      <ConfigProvider
        locale={antdLanguage}
        theme={{
          cssVar: { key: RA_ANTD_APP_CSS_TOKEN_KEY },
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
