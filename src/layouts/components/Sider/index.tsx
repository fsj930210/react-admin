import { useNavigate } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { MenuProps } from 'antd/lib';

import AppLogo from '@/components/AppLogo';

import useMenu from '@/layouts/helper/useMenu';
import { findAncestorsMenu } from '@/layouts/helper/utils';
import useMenuStore from '@/store/menu';

const { Sider } = Layout;
const AppSider = () => {
  const { collapsed, setBreadcrumbList } = useMenuStore();
  const { menuItems } = useMenu();
  const navigate = useNavigate();
  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    const list = findAncestorsMenu(key, menuItems, handleItemClick);
    setBreadcrumbList(list);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={48}>
      <AppLogo showTitle={!collapsed} style={{ color: '#ffffff' }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={handleItemClick}
      />
    </Sider>
  );
};

export default AppSider;
