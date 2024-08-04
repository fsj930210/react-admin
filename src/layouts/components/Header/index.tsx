import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

import Breadcrumb from './components/Breadcrumb';
import UserCenter from './components/UserCenter';
import styles from './index.module.css';
import FullScreen from './widget/FullScreen';
import GlobalSearch from './widget/GlobalSearch';
import Notification from './widget/Notification';

import useMenuStore from '@/store/menu';

const { Header } = Layout;
const { useToken } = theme;
const AppHeader = () => {
  const { collapsed, toggleCollapsed } = useMenuStore();
  const { token } = useToken();
  const { colorBgContainer } = token;
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="flex justify-between items-center"
    >
      <div className={styles['header-left']}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => toggleCollapsed()}
          className="text-[16px] h-full"
        />
        <Breadcrumb />
      </div>
      <div className={styles['header-right']}>
        <GlobalSearch />
        <FullScreen />
        <Notification />
        <UserCenter />
      </div>
    </Header>
  );
};

export default AppHeader;
