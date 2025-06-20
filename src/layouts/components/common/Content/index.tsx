import { useMemo, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
import { v4 as uuidV4 } from 'uuid';

import AppLoading from '@/components/app/AppLoading';
import RaAnimator from '@/components/RaAnimator';
import { KeepAlive } from '@/components/RaKeepAlive';
import type { KeepAliveRef } from '@/components/RaKeepAlive/interface';

import AppFooter from '../Footer';
import LayoutTabs from '../LayoutTabs';

import { LayoutTabsContext } from './LayoutTabsContext';

import useAppConfigStoreSelector from '@/store/appConfig';
import useLayoutStoreSelector from '@/store/layout';
const { Content } = Layout;

const AppContent = () => {
  const [contentId, setContentId] = useState(uuidV4());
  const { keepAlive, pageTransitionType } = useAppConfigStoreSelector([
    'keepAlive',
    'pageTransitionType',
  ]);
  const { showTabs } = useLayoutStoreSelector(['showTabs']);
  const { pathname, search } = useLocation();
  const keepAliveRef = useRef<KeepAliveRef | null>(null);

  const cacheKey = useMemo(() => pathname + search, [pathname, search]);

  return (
    <LayoutTabsContext.Provider
      value={{
        keepAliveRef: keepAliveRef,
        refresh: () => setContentId(uuidV4()),
      }}
    >
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
                  <div className="flex-1 relative">
                    <RaAnimator
                      key={cacheKey}
                      config={{
                        type: pageTransitionType,
                        duration: 0.4,
                        variants: {
                          initial: { x: -20 }, // 覆盖初始x位移（原默认-50）
                          exit: { x: -20 }, // 覆盖退出x位移（原默认-50）
                        },
                      }}
                    >
                      <Outlet />
                    </RaAnimator>
                  </div>
                  <AppFooter />
                </div>
              </KeepAlive>
            ) : (
              <div
                className="h-full flex flex-col overflow-auto bg-[var(--ant-layout-body-bg)]"
                id="ra-content-container"
              >
                <div
                  className="flex-1 relative ra-page-container"
                  key={contentId}
                >
                  <RaAnimator
                    key={cacheKey}
                    config={{
                      type: pageTransitionType,
                      duration: 0.4,
                      variants: {
                        initial: { x: -20 }, // 覆盖初始x位移（原默认-50）
                        exit: { x: -20 }, // 覆盖退出x位移（原默认-50）
                      },
                    }}
                  >
                    <Outlet />
                  </RaAnimator>
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
