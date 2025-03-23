import { Layout } from 'antd';

import { KeepAliveProvider } from '@/components/RaKeepAlive';

import AppContent from './components/Content';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import useMenu from './hooks/useMenu';

const BasicLayout = () => {
  useMenu();

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
