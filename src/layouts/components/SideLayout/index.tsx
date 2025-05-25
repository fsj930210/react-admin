import { Layout, Menu } from "antd"

import AppContent from "../common/Content"
import AppHeader from "../common/Header"

import useMenuStoreSelector from "@/store/menu"

const { Sider } = Layout
const VerticalLayout = () => {
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
  return (
    <Layout className="h-full" >
      <AppHeader
        showLogo
        showLeft
        showCollapsed={false}
      />
      <Layout className="h-full" hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          collapsedWidth={48}
          onCollapse={toggleCollapsed}
        >
          <Menu
            mode="inline"
            items={menuItems}
            className="overflow-y-auto flex-1"
          />
        </Sider>
        <Layout className="relative overflow-hidden h-full flex flex-col">
          <AppContent />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default VerticalLayout