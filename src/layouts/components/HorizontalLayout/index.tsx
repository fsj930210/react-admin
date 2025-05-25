import { Layout, Menu } from "antd"


import AppContent from "../common/Content"
import AppHeader from "../common/Header"

import { useAppContext } from "@/AppContext";
import useMenuActions from "@/layouts/hooks/useMenuActions";
import useMenuStoreSelector from '@/store/menu';

const HorizontalLayout = () => {
  const { menuItems } = useMenuStoreSelector(['menuItems']);
  const {
    handleItemClick,
    selectedKeys,
  } = useMenuActions(menuItems);
  const { theme } = useAppContext()
  return (
    <Layout className="relative overflow-hidden h-full flex flex-col">
      <AppHeader
        showLeft={false}
        showLogo
      >
        <Menu
          theme={theme}
          mode="horizontal"
          items={menuItems}
          className="flex-1 min-w-0 h-full"
          selectedKeys={selectedKeys}
          onClick={handleItemClick}
        />
      </AppHeader>
      <AppContent />
    </Layout>
  )
}

export default HorizontalLayout
