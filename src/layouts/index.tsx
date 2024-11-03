import { Layout } from 'antd';

import { KeepAliveRoot } from '@/components/KeepAlive';

import AppContent from './components/Content';
import AppFooter from './components/Footer';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import useMenu from './hooks/useMenu';

const BasicLayout = () => {
  useMenu();
  return (
    <KeepAliveRoot>
      <Layout className="h-full" hasSider>
        <AppSider />
        <Layout className="relative overflow-hidden h-full">
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </KeepAliveRoot>
  );
};

export default BasicLayout;
