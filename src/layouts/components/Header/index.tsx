import { Button, Layout, Space } from 'antd';
import { useShallow } from 'zustand/react/shallow';

import DarkTheme from '@/components/business/DarkTheme';
import I18n from '@/components/business/I18n';
import Icon from '@/components/Icon';

import Breadcrumb from './components/Breadcrumb';
import FullScreen from './components/FullScreen';
import GlobalSearch from './components/GlobalSearch';
import Notification from './components/Notification';
import UserCenter from './components/UserCenter';
import styles from './index.module.css';

import useMenuStore from '@/store/menu';

const { Header } = Layout;
const AppHeader = () => {
  const { collapsed, toggleCollapsed } = useMenuStore(
    useShallow((state) => ({
      toggleCollapsed: state.toggleCollapsed,
      collapsed: state.collapsed,
    })),
  );

  return (
    <Header
      style={{
        padding: '0 12px',
        backgroundColor: 'var(--ant-color-bg-container)',
      }}
      className="flex justify-between items-center border-b-[1px] border-b-[var(--ant-color-border)] border-b-solid"
    >
      <div className={styles['header-left']}>
        <Button
          type="text"
          icon={
            collapsed ? (
              <Icon icon="ant-design:menu-unfold-outlined" fontSize={22} />
            ) : (
              <Icon icon="ant-design:menu-fold-outlined" fontSize={22} />
            )
          }
          onClick={() => toggleCollapsed()}
          className="h-full text-[24px]"
          style={{ width: 'auto' }}
        />
        <Breadcrumb />
      </div>
      <div className={styles['header-right']}>
        <Space size={[10, 0]}>
          <GlobalSearch />
          <DarkTheme />
          <I18n />
          <FullScreen />
          <Notification />
          <UserCenter />
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
