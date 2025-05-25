import { Layout, Menu } from "antd"

import AppLogo from "@/components/app/AppLogo"
import RaIcon from "@/components/RaIcon"

import AppContent from "../common/Content"
import AppHeader from "../common/Header"

import styles from './index.module.css'

import { useAppContext } from "@/AppContext"
import useMenuActions from "@/layouts/hooks/useMenuActions"
import useMenuStoreSelector from "@/store/menu"

const { Sider } = Layout
const VerticalLayout = () => {
  const { theme } = useAppContext()

  const {
    collapsed,
    menuItems,
    toggleCollapsed
  } = useMenuStoreSelector([
    'collapsed',
    'menuItems',
    'flatMenuItems',
    'toggleCollapsed'
  ]);
  const {
    handleItemClick,
    onOpenChange,
    selectedKeys,
    openKeys
  } = useMenuActions(menuItems);

  return (
    <Layout className="h-full" hasSider>
      <Sider
        theme={theme}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        className={styles.sider}
        width={256}
        trigger={collapsed ? <RaIcon icon="lucide:chevrons-right" fontSize={16} /> : <RaIcon icon="lucide:chevrons-left" fontSize={16} />}
      >
        <AppLogo
          showTitle={!collapsed}
          style={{
            color: 'var(--ant-color-text)',
            backgroundColor: 'var(--ant-color-bg-container)',
            paddingLeft: '24px',
          }}
        />
        <Menu
          theme={theme}
          className="overflow-y-auto flex-1"
          mode="inline"
          items={menuItems}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          inlineCollapsed={collapsed}
          onOpenChange={onOpenChange(menuItems)}
          onClick={handleItemClick}
        />
      </Sider>
      <Layout className="relative overflow-hidden h-full flex flex-col">
        <AppHeader />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default VerticalLayout