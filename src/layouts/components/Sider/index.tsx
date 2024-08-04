import { useNavigate } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import AppLogo from '@/components/AppLogo';

import useMenu from '@/layouts/helper/useMenu';
import useMenuStore from '@/store/menu';

const { Sider } = Layout;
const AppSider = () => {
  const { collapsed } = useMenuStore();
  const { menuItems } = useMenu();
  const navigate = useNavigate();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={48}>
      <AppLogo showTitle={!collapsed} style={{ color: '#ffffff' }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
        }}
      />
    </Sider>
  );
};

export default AppSider;
