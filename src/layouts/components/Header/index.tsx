import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

import useMenuStore from '@/store/menu';

const { Header } = Layout;
const { useToken } = theme;
const AppHeader = () => {
  const { collapsed, toggleCollapsed } = useMenuStore();
  const { token } = useToken();
  const { colorBgContainer } = token;
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggleCollapsed()}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default AppHeader;
