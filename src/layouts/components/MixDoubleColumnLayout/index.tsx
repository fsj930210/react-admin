import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

import { Layout, Menu } from "antd";

import AppLogo from "@/components/app/AppLogo";

import AppContent from "../common/Content";
import AppHeader from "../common/Header";

import styles from './index.module.css'

import type { MenuItem } from "@/types/menu";

import { useAppContext } from "@/AppContext";
import useMenuActions from "@/layouts/hooks/useMenuActions";
import { getAncestorLevelKey } from "@/layouts/utils/utils";
import useMenuStoreSelector from "@/store/menu";
const { Sider } = Layout;

const MixDoubleColumnLayout = () => {
  const location = useLocation()
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
  const [secondLevelMenuSelectedKeys, setSecondLevelMenuSelectedKeys] = useState<string[]>([]);
  const [secondLevelMenuItems, setSecondLevelMenuItems] = useState<MenuItem[]>([]);
  const [thirdLevelMenuItems, setThirdLevelMenuItems] = useState<MenuItem[]>([]);
  const firstLevelMenuItems = menuItems.map(item => {
    return {
      ...item,
      children: undefined
    }
  })
  const {
    selectedKeys,
    openKeys,
    handleItemClick,
    onOpenChange,
  } = useMenuActions(menuItems)
  useEffect(() => {
    const selectedItem = flatMenuItems.find(item => location.pathname === item.key);
    if (selectedItem) {
      const ancestorLevelKeys: string[] = []
      getAncestorLevelKey(selectedItem, flatMenuItems, ancestorLevelKeys);
      const length = ancestorLevelKeys.length;
      const firstLevelMenuSelectedKeys = length > 0 ? [ancestorLevelKeys[0]] : [selectedItem.key];
      const secondLevelMenuSelectedKeys = length > 0 ? length > 1 ? [ancestorLevelKeys[1]] : [selectedItem.key] : []
      setFirstLevelMenuSelectedKeys(firstLevelMenuSelectedKeys);
      setSecondLevelMenuSelectedKeys(secondLevelMenuSelectedKeys);
      const firstLevelMenuItem = flatMenuItems.find(item => item.key === ancestorLevelKeys[0]);
      if (firstLevelMenuItem?.children) {
        const secondLevelItem = flatMenuItems.find(item => item.key === secondLevelMenuSelectedKeys[0]);
        console.log(secondLevelItem)
        if (secondLevelItem?.children) {
          setThirdLevelMenuItems(secondLevelItem.children)
        } else {
          setThirdLevelMenuItems([])
        }
        setSecondLevelMenuItems(firstLevelMenuItem.children.map(i => ({ ...i, children: undefined })));
      } else {
        setSecondLevelMenuItems([]);
        setThirdLevelMenuItems([]);
      }
    }
  }, [location.pathname, flatMenuItems])
  return (
    <Layout className="h-full" hasSider>
      {
        secondLevelMenuItems.length > 0 ? (
          <Sider
            collapsed
            theme={theme}
            className={` ${styles['second-sider']} overflow-y-auto`}

          >
            <AppLogo
              showTitle={false}
              style={{
                color: 'var(--ant-color-text)',
                backgroundColor: 'var(--ant-color-bg-container)',
              }}
            />
            <Menu
              className={styles['second-level-menu']}
              theme={theme}
              inlineCollapsed
              mode="inline"
              items={secondLevelMenuItems}
              selectedKeys={secondLevelMenuSelectedKeys}
              onClick={({ key }) => {
                const item = flatMenuItems.find(item => item.key === key)
                if (!item) {
                  setThirdLevelMenuItems([]);
                  return
                }
                if (!item.children || item.children.length === 0) {
                  setThirdLevelMenuItems([]);
                  handleItemClick({ key });
                  return
                }
                setThirdLevelMenuItems(item?.children || []);
                handleItemClick({ key: item.children[0].key })
              }}
            />


          </Sider>
        ) : null
      }

      {thirdLevelMenuItems.length > 0 ? (
        <Sider
          theme={theme}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        >
          <Menu
            theme={theme}
            mode="inline"
            items={thirdLevelMenuItems}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange(thirdLevelMenuItems)}
            onClick={handleItemClick}
          />
        </Sider>
      ) : null}

      <Layout className="relative overflow-hidden h-full flex flex-col">
        <AppHeader showLeft={false} showLogo={secondLevelMenuItems.length <= 0}>
          <Menu
            theme={theme}
            mode="horizontal"
            items={firstLevelMenuItems}
            className="flex-1 min-w-0 h-full"
            selectedKeys={firstLevelMenuSelectedKeys}
            onClick={({ key }) => {
              const item = flatMenuItems.find(item => item.key === key)
              if (!item) {
                return
              }
              if (!item.children) {
                handleItemClick({ key });
                return
              }
              const secondLevelMenuItems = (item?.children || []).map(item => {
                return {
                  ...item,
                  children: undefined
                }
              })
              handleItemClick({ key: item.children[0].key });
              setSecondLevelMenuItems(secondLevelMenuItems)
            }}
          />
        </AppHeader>
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default MixDoubleColumnLayout