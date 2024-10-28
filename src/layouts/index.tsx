import { Layout } from 'antd';

import { KeepAliveProvider } from '@/components/KeepAlive';

import AppContent from './components/Content';
import AppFooter from './components/Footer';
import AppHeader from './components/Header';
import AppSider from './components/Sider';

const BasicLayout = () => {
  return (
    <KeepAliveProvider>
      <Layout className="h-full" hasSider>
        <AppSider />
        <Layout className="relative overflow-hidden">
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </KeepAliveProvider>
  );
};

export default BasicLayout;
