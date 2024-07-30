import { RouterProvider } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

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
        token: {
          colorPrimary: primaryColor,
          borderRadius: 4,
        },
        components: {
          Form: {
            itemMarginBottom: 16,
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
