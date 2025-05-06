import { App, Layout } from 'antd';

import { KeepAliveProvider } from '@/components/RaKeepAlive';

import { emitter } from '@/utils/utils';

import AppContent from './components/Content';
import AppHeader from './components/Header';
import AppSider from './components/Sider';

import useGoto from '@/hooks/useGoto';

const BasicLayout = () => {
  const { message } = App.useApp();
  const { go } = useGoto();
  // 全局401
  emitter.on('api_401', () => {
    go('/login', { replace: true });
  });
  // 全局api错误
  emitter.on('api_error', (error: any) => {
    message.destroy();
    message.error(error?.message || '系统内部异常');
  });

  return (
    <KeepAliveProvider>
      <Layout className="h-full" hasSider>
        <AppSider />
        <Layout className="relative overflow-hidden h-full flex flex-col">
          <AppHeader />
          <AppContent />
        </Layout>
      </Layout>
    </KeepAliveProvider>
  );
};

export default BasicLayout;
