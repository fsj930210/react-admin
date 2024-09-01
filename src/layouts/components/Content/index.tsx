import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

const { Content } = Layout;
const AppContent = () => {
  return (
    <Content
      style={{
        padding: 24,
        minHeight: 280,
      }}
    >
      <Outlet />
    </Content>
  );
};

export default AppContent;
