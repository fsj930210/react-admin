import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

import { Layout, Menu } from "antd"

import AppContent from "../common/Content";
import AppHeader from "../common/Header"

import type { MenuItem } from "@/types/menu";

import { useAppContext } from "@/AppContext";
import useMenuActions from "@/layouts/hooks/useMenuActions";
import { getAncestorLevelKey } from "@/layouts/utils/utils";
import useMenuStoreSelector from "@/store/menu";

const { Sider } = Layout
const MixVerticalLayout = () => {
  const location = useLocation();
  const { theme } = useAppContext()
  const {
    collapsed,
    menuItems,
    flatMenuItems,
    toggleCollapsed,
  } = useMenuStoreSelector(
    [
      'collapsed',
      'menuItems',
      'flatMenuItems',
      'toggleCollapsed',
    ]
  );
  const [firstLevelMenuSelectedKeys, setFirstLevelMenuSelectedKeys] = useState<string[]>([]);
  const [secondLevelMenuItems, setSecondLevelMenuItems] = useState<MenuItem[]>([])
  const firstLevelMenuItems = menuItems.map(item => {
    return {
      ...item,
      children: undefined
    }
  })
  const {
    selectedKeys,
    openKeys,
    onOpenChange,
    handleItemClick
  } = useMenuActions(menuItems)
  useEffect(() => {
    const selectedItem = flatMenuItems.find(item => location.pathname === item.key);
    if (selectedItem) {
      const ancestorLevelKeys: string[] = []
      getAncestorLevelKey(selectedItem, flatMenuItems, ancestorLevelKeys);
      setFirstLevelMenuSelectedKeys(ancestorLevelKeys.length > 0 ? [ancestorLevelKeys[0]] : [selectedItem.key]);
      const firstLevelMenuItem = flatMenuItems.find(item => item.key === ancestorLevelKeys[0]);
      if (firstLevelMenuItem?.children) {
        setSecondLevelMenuItems(firstLevelMenuItem.children)
      } else {
        setSecondLevelMenuItems([]);
      }
    }
  }, [location.pathname, flatMenuItems])
  return (
    <Layout className="h-full">
      <AppHeader
        showLeft={false}
        showLogo
      >
        <Menu
          selectedKeys={firstLevelMenuSelectedKeys}
          theme={theme}
          mode="horizontal"
          items={firstLevelMenuItems}
          className="flex-1 min-w-0 h-full"
          onClick={({ key }) => {
            const item = flatMenuItems.find(item => item.key === key)
            if (!item) {
              return
            }
            setFirstLevelMenuSelectedKeys([key]);
            if (!item.children) {
              handleItemClick({ key });
              return
            }
            handleItemClick({ key: item.children[0].key });
            setSecondLevelMenuItems(item?.children || [])
          }}
        />
      </AppHeader>

      <Layout hasSider className="relative overflow-hidden h-full flex flex-col">
        {
          secondLevelMenuItems.length > 0 ? (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={toggleCollapsed}
              theme={theme}
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
          ) : null
        }
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default MixVerticalLayout