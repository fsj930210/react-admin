import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import AppTabs from '../Tabs';

const { Content } = Layout;
const AppContent = () => {
  return (
    <Content>
      <AppTabs />
      <Outlet />
    </Content>
  );
};

export default AppContent;
