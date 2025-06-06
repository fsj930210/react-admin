import type { FC } from 'react';

import { useMount } from 'ahooks';
import { App } from 'antd';

import AppConfig from '@/components/app/AppConfig';
import { KeepAliveProvider } from '@/components/RaKeepAlive';

import storage from '@/utils/storage';
import { emitter } from '@/utils/utils';

import DoubleColumnLayout from './components/DoubleColumnLayout';
import FullScreenLayout from './components/FullScreenLayout';
import HorizontalLayout from './components/HorizontalLayout';
import MixDoubleColumnLayout from './components/MixDoubleColumnLayout';
import MixVerticalLayout from './components/MixVerticalLayout';
import SideLayout from './components/SideLayout';
import VerticalLayout from './components/VerticalLayout';
import { useInitMenu } from './hooks/useInitMenu';

import type { LayoutType } from '@/store/appConfig';

import useGoto from '@/hooks/useGoto';
import useLayoutStoreSelector from '@/store/layout';

const layoutComponents: Record<LayoutType, FC> = {
  vertical: VerticalLayout,
  horizontal: HorizontalLayout,
  doubleColumn: DoubleColumnLayout,
  mixVertical: MixVerticalLayout,
  mixDoubleColumn: MixDoubleColumnLayout,
  fullScreen: FullScreenLayout,
  side: SideLayout,
};

const BasicLayout = () => {
  useInitMenu();
  const { layoutType } = useLayoutStoreSelector(['layoutType']);
  const { message } = App.useApp();
  const { go } = useGoto();
  function goToLogin() {
    const currentPath = window.location.pathname;
    go(`/login?redirect=${currentPath}`, { replace: true });
  }
  useMount(() => {
    // 全局401
    emitter.on('api_401', () => {
      storage.removeItem('access_token');
      goToLogin();
    });
    // 全局api错误
    emitter.on('api_error', (error: any) => {
      message.destroy();
      message.error(error?.message || '系统内部异常');
    });
    if (!storage.getItem('access_token')) {
      goToLogin();
    }
  });
  const Layout = layoutComponents[layoutType];
  return (
    <KeepAliveProvider>
      <Layout />
      <AppConfig />
    </KeepAliveProvider>
  );
};

export default BasicLayout;
