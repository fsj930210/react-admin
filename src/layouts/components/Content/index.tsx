import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import Error500 from '@/components/Error/500';

const { Content } = Layout;
const AppContent = () => {
  return (
    <Content
      style={{
        padding: 24,
        minHeight: 280,
      }}
    >
      <ErrorBoundary
        fallbackRender={({ error }) => {
          console.log(error);
          return <Error500 subTitle={error?.message} />;
        }}
      >
        <Outlet />
      </ErrorBoundary>
    </Content>
  );
};

export default AppContent;
