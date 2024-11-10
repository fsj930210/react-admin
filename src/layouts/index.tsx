import { Layout } from 'antd';

import { KeepAliveRoot } from '@/components/RaKeepAlive';

import AppContent from './components/Content';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import useMenu from './hooks/useMenu';

const BasicLayout = () => {
  useMenu();
  return (
    <KeepAliveRoot>
      <Layout className="h-full" hasSider>
        <AppSider />
        <Layout className="relative overflow-hidden h-full flex flex-col">
          <AppHeader />
          <AppContent />
        </Layout>
      </Layout>
    </KeepAliveRoot>
  );
};

export default BasicLayout;
