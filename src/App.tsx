import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import AppLoading from './components/AppLoading';
// import LockScreen from './components/LockScreen';
import router from './router';

import useGlobalStore from '@/store';

import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

const App = () => {
  const { primaryColor } = useGlobalStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          colorPrimary: primaryColor,
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
  );
};

export default App;
