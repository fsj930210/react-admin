import { Layout } from 'antd';

import AppFooter from './components/Footer';
import AppHeader from './components/Header';
import AppSider from './components/Sider';
import AppTabs from './components/Tabs';

const BasicLayout = () => {
  return (
    <Layout className="h-full" hasSider>
      <AppSider />
      <Layout className="relative overflow-hidden">
        <AppHeader />
        <AppTabs />
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
