import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import AppContent from '../common/Content';
import AppHeader from '../common/Header';

import styles from './index.module.css';

import type { MenuItem } from '@/types/menu';

import { useAppContext } from '@/AppContext';
import useMenuActions from '@/layouts/hooks/useMenuActions';
import { getAncestorLevelKey } from '@/layouts/utils/utils';
import useMenuStoreSelector from '@/store/menu';

const { Sider } = Layout;

const DoubleColumnLayout = () => {
  const location = useLocation();
  const { theme } = useAppContext();
  const { collapsed, menuItems, flatMenuItems, toggleCollapsed } =
    useMenuStoreSelector([
      'collapsed',
      'menuItems',
      'flatMenuItems',
      'accordion',
      'toggleCollapsed',
    ]);
  const [firstLevelMenuSelectedKeys, setFirstLevelMenuSelectedKeys] = useState<
    string[]
  >([]);
  const [secondLevelMenuItems, setSecondLevelMenuItems] = useState<MenuItem[]>(
    [],
  );
  const firstLevelMenuItems = menuItems.map((item) => {
    return {
      ...item,
      children: undefined,
    };
  });
  const { openKeys, selectedKeys, handleItemClick, onOpenChange } =
    useMenuActions(menuItems);

  useEffect(() => {
    const selectedItem = flatMenuItems[location.pathname];
    if (selectedItem) {
      const ancestorLevelKeys: string[] = [];
      getAncestorLevelKey(selectedItem, flatMenuItems, ancestorLevelKeys);
      setFirstLevelMenuSelectedKeys(
        ancestorLevelKeys.length > 0
          ? [ancestorLevelKeys[0]]
          : [selectedItem.key],
      );
      const firstLevelMenuItem = flatMenuItems[ancestorLevelKeys[0]];
      if (firstLevelMenuItem?.children) {
        setSecondLevelMenuItems(firstLevelMenuItem.children);
      } else {
        setSecondLevelMenuItems([]);
      }
    }
  }, [location.pathname, flatMenuItems]);

  return (
    <Layout className="h-full" hasSider>
      <Sider collapsed theme={theme} className="overflow-y-auto">
        <Menu
          inlineCollapsed
          mode="inline"
          items={firstLevelMenuItems}
          theme={theme}
          selectedKeys={firstLevelMenuSelectedKeys}
          className={styles['first-level-menu']}
          onClick={({ key }) => {
            const item = flatMenuItems[key];
            if (!item) {
              return;
            }
            setFirstLevelMenuSelectedKeys([key]);
            if (!item.children) {
              handleItemClick({ key });
              return;
            }
            handleItemClick({ key: item.children[0].key });
            setSecondLevelMenuItems(item?.children || []);
          }}
        />
      </Sider>
      {secondLevelMenuItems.length > 0 ? (
        <Sider
          theme={theme}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        >
          <Menu
            inlineCollapsed={collapsed}
            theme={theme}
            mode="inline"
            items={secondLevelMenuItems}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onClick={handleItemClick}
            onOpenChange={onOpenChange(secondLevelMenuItems)}
          />
        </Sider>
      ) : null}
      <Layout className="relative overflow-hidden h-full flex flex-col">
        <AppHeader />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default DoubleColumnLayout;
