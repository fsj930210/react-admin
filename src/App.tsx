import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import Error500 from '@/components/Error/500';

import AppLoading from './components/AppLoading';
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
        <ErrorBoundary
          fallbackRender={({ error }) => {
            console.log(error);
            return <Error500 subTitle={error?.message} />;
          }}
        >
          <Suspense fallback={<AppLoading showText />}>
            <RouterProvider router={router} fallbackElement={<Error500 />} />
          </Suspense>
        </ErrorBoundary>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
