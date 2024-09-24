import { Layout } from 'antd';

import AppTabs from '../Tabs';

const { Content } = Layout;
const AppContent = () => {
  return (
    <Content>
      <AppTabs />
    </Content>
  );
};

export default AppContent;
