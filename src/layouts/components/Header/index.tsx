import { Button, Layout, Space } from 'antd';

import DarkTheme from '@/components/business/DarkTheme';
import I18n from '@/components/business/I18n';
import Icon from '@/components/RaIcon';

import Breadcrumb from './components/Breadcrumb';
import FullScreen from './components/FullScreen';
import GlobalSearch from './components/GlobalSearch';
import Notification from './components/Notification';
import UserCenter from './components/UserCenter';
import styles from './index.module.css';

import useMenuStore from '@/store/sider';

const { Header } = Layout;
const AppHeader = () => {
  const { collapsed, toggleCollapsed } = useMenuStore([
    'collapsed',
    'toggleCollapsed',
  ]);

  return (
    <Header
      style={{
        padding: '0 12px',
        backgroundColor: 'var(--ant-color-bg-container)',
      }}
      className="flex justify-between items-center  border-b-[1px] border-b-[var(--ant-color-border)] border-b-solid"
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
          className="h-full text-[24px] line-height-[1]"
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
