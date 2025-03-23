import { useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
import { v4 as uuidV4 } from 'uuid';

import AppLoading from '@/components/app/AppLoading';
import { KeepAlive } from '@/components/RaKeepAlive';
import type { KeepAliveRef } from '@/components/RaKeepAlive/interface';

import AppFooter from '../Footer';
import LayoutTabs from '../Tabs';

import { LayoutTabsContext } from './LayoutTabsContext';

import useGlobalStoreSelector from '@/store/global';
const { Content } = Layout;

const AppContent = () => {
  const [contentId, setContentId] = useState(uuidV4());
  const { showTabs, keepAlive } = useGlobalStoreSelector([
    'showTabs',
    'keepAlive',
  ]);
  const { pathname, search } = useLocation();
  const keepAliveRef = useRef<KeepAliveRef | null>(null);
  const cacheFuncs = useMemo(
    () => ({
      ...(keepAliveRef.current || {}),
      refresh: () => setContentId(uuidV4()),
    }),
    [keepAliveRef.current],
  );
  const cacheKey = useMemo(() => pathname + search, [pathname, search]);
  return (
    <LayoutTabsContext.Provider value={{ ...cacheFuncs }}>
      <div className="flex-1 overflow-hidden">
        <Content className="flex flex-col h-full">
          {showTabs ? <LayoutTabs /> : null}
          <div className="flex-1 overflow-hidden">
            {keepAlive ? (
              <KeepAlive
                className="p-[8px] overflow-auto h-full"
                cachedKey={cacheKey}
                ref={keepAliveRef}
                refreshFallback={<AppLoading />}
              >
                <div
                  className="h-full flex flex-col bg-[var(--ant-layout-body-bg)]"
                  id="ra-content-container"
                >
                  <div className="flex-1">
                    <Outlet />
                  </div>
                  <AppFooter />
                </div>
              </KeepAlive>
            ) : (
              <div
                className="h-full flex flex-col overflow-auto bg-[var(--ant-layout-body-bg)]"
                id="ra-content-container"
              >
                <div className="flex-1" key={contentId}>
                  <Outlet />
                </div>
                <AppFooter />
              </div>
            )}
          </div>
        </Content>
      </div>
    </LayoutTabsContext.Provider>
  );
};

export default AppContent;
