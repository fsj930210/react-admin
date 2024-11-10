import { useMemo, useRef } from 'react';
import { useOutlet } from 'react-router-dom';

import { Layout } from 'antd';

import AppLoading from '@/components/app/AppLoading';
import { KeepAlive } from '@/components/RaKeepAlive';
import type { KeepAliveRef } from '@/components/RaKeepAlive/interface';

import AppFooter from '../Footer';
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
      <div className="flex-1 overflow-hidden" id="ra-content-container">
        <Content className="flex flex-col h-full">
          <LayoutTabs />
          <div className="flex-1 overflow-auto">
            <KeepAlive
              className="flex-1 p-[8px]"
              keepRoutes
              ref={keepAliveRef}
              refreshFallback={<AppLoading />}
            >
              {outlet}
            </KeepAlive>
            <AppFooter />
          </div>
        </Content>
      </div>
    </LayoutTabsContext.Provider>
  );
};

export default AppContent;
