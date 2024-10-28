import { useOutlet } from 'react-router-dom';

import { Layout } from 'antd';

import { KeepAliveRoute } from '@/components/KeepAlive';

import AppTabs from '../Tabs';

const { Content } = Layout;

const AppContent = () => {
  const outlet = useOutlet();

  return (
    <div className="h-full" id="ra-content-container">
      <Content className="flex flex-col">
        <AppTabs />
        <KeepAliveRoute className="h-full flex-1">{outlet}</KeepAliveRoute>
      </Content>
    </div>
  );
};

export default AppContent;
