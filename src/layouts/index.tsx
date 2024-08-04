import { Layout } from 'antd';

import AppContent from './components/Content';
import AppFooter from './components/Footer';
import AppHeader from './components/Header';
import AppSider from './components/Sider';

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
