import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { useShallow } from 'zustand/react/shallow';

import AppLogo from '@/components/app/AppLogo';

import { getLevelKeys } from '../../utils/utils';

import styles from './index.module.css';

import type { LevelKeysProps } from '../../utils/utils';
import type { MenuProps } from 'antd/lib';

import useMenuStore from '@/store/menu';

const { Sider } = Layout;
const AppSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, menuItems } = useMenuStore(
    useShallow((state) => ({
      menuItems: state.menuItems,
      collapsed: state.collapsed,
    })),
  );
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 监听路由变化 设置侧边栏展开选中
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
  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      className={styles['app-layout-sider']}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={48}
    >
      <AppLogo
        showTitle={!collapsed}
        style={{
          color: 'var(--ant-color-text)',
          backgroundColor: 'var(--ant-color-bg-container)',
        }}
      />
      <Menu
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
