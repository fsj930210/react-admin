import { Layout } from 'antd';

import AppContent from '@/layouts/components/Content';
import AppFooter from '@/layouts/components/Footer';
import AppHeader from '@/layouts/components/Header';
import AppSider from '@/layouts/components/Sider';

const BasicLayout = () => {
  return (
    <Layout className="h-full">
      <AppSider />
      <Layout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
