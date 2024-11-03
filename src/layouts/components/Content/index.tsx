import { useMemo, useRef } from 'react';
import { useOutlet } from 'react-router-dom';

import { Layout } from 'antd';

import AppLoading from '@/components/app/AppLoading';
import { KeepAlive } from '@/components/KeepAlive';
import type { KeepAliveRef } from '@/components/KeepAlive/interface';

import LayoutTabs from '../Tabs';

import { LayoutTabsContext } from './LayoutTabsContext';

const { Content } = Layout;

const AppContent = () => {
  const outlet = useOutlet();
  const keepAliveRef = useRef<KeepAliveRef | null>(null);
  const cacheFuncs = useMemo(() => {
    return { ...keepAliveRef.current };
  }, [keepAliveRef.current]);

  return (
    <LayoutTabsContext.Provider value={{ ...cacheFuncs }}>
      <div className="h-full" id="ra-content-container">
        <Content className="flex flex-col h-full">
          <LayoutTabs />
          <KeepAlive
            className="h-full flex-1"
            keepRoutes
            ref={keepAliveRef}
            refreshFallback={<AppLoading />}
          >
            {outlet}
          </KeepAlive>
        </Content>
      </div>
    </LayoutTabsContext.Provider>
  );
};

export default AppContent;
