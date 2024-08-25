import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { MenuProps } from 'antd/lib';

import AppLogo from '@/components/AppLogo';

import styles from './index.module.css';

import useMenu from '@/layouts/helper/useMenu';
import {
  generateBreadcrumList,
  getLevelKeys,
  LevelKeysProps,
} from '@/layouts/helper/utils';
import useMenuStore from '@/store/menu';

const { Sider } = Layout;
const AppSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, setBreadcrumbList } = useMenuStore();
  const { menuItems } = useMenu();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 监听路由变化 设置侧边栏展开选中以及面包屑
  useEffect(() => {
    setSelectedKeys([location.pathname]);
    const keysArr = location.pathname.split('/').filter((i) => i);
    const keys: string[] = [];
    // 根据pathname生成keys
    keysArr.reduce((prev: string, current: string) => {
      const path = prev ? `${prev}/${current}` : `/${current}`;
      keys.push(path);
      return path;
    }, '');
    setOpenKeys(keys);
    // 根据pathname生成面包屑list
    const breadcrumbList = generateBreadcrumList(
      location.pathname,
      menuItems,
      handleItemClick,
    );
    // 将面包屑存入store中;
    setBreadcrumbList(breadcrumbList);
  }, [location.pathname]);
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);
  // 菜单展开时关闭其他已经展开的菜单
  const onOpenChange: MenuProps['onOpenChange'] = (allOpenKeys) => {
    const currentOpenKey = allOpenKeys.find(
      (key) => openKeys.indexOf(key) === -1,
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = allOpenKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setOpenKeys(
        allOpenKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setOpenKeys(allOpenKeys);
    }
  };
  // 点击时生成面包屑，由于面包屑里面也会包含菜单，所以传递菜单点击方法
  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
    // const list = generateBreadcrumList(key, menuItems, handleItemClick);
    // 将面包屑存入store中
    // setBreadcrumbList(list);
  };
  return (
    <Sider
      className={styles['app-layout-sider']}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={48}
    >
      <AppLogo showTitle={!collapsed} style={{ color: '#ffffff' }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={handleItemClick}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        className="overflow-y-auto flex-1"
      />
    </Sider>
  );
};

export default AppSider;
