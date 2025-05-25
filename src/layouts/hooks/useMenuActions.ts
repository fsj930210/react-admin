import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getLevelKeys } from "../utils/utils";

import type { MenuItem } from "@/types/menu";

import useMenuStoreSelector from "@/store/menu";

const useMenuActions = (menuItems: MenuItem[]): {
  openKeys: string[];
  selectedKeys: string[];
  onOpenChange: (menuItems: MenuItem[]) => (allOpenKeys: string[]) => void;
  handleItemClick: ({ key }: { key: string }) => void;
  setSelectedKeys: (keys: string[]) => void;
} => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accordion, flatMenuItems } = useMenuStoreSelector(['accordion', 'flatMenuItems']);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 处理菜单展开/收起
  const onOpenChange = (menuItems: MenuItem[]) => (allOpenKeys: string[]) => {
    const currentOpenKey = allOpenKeys.find((key) => !openKeys.includes(key));

    if (currentOpenKey) {
      // 展开菜单
      const levelKeys = getLevelKeys(menuItems);
      const sameLevel = allOpenKeys.filter(
        (key) => levelKeys[key] === levelKeys[currentOpenKey],
      );
      if (accordion) {
        // 保留同级最后一个，移除其他同级
        const filteredKeys = allOpenKeys.filter(
          (key) => !sameLevel.includes(key) || key === currentOpenKey,
        );
        // 只保留当前层级及其父级
        setOpenKeys(
          filteredKeys.filter(
            (key) => levelKeys[key] <= levelKeys[currentOpenKey],
          ),
        );
      } else {
        // 保留同级
        setOpenKeys(allOpenKeys);
      }
    } else {
      // 收起菜单
      setOpenKeys(allOpenKeys);
    }
  };
  // 处理菜单项点击
  const handleItemClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    const item = flatMenuItems.find((item: MenuItem) => item.key === key);
    if (!item || item.disabled) return;
    if (item?.open_mode === 'newBrowserTab') {
      window.open(item?.path, '_blank');
    } else {
      navigate(key);
    }
  };
  /**
 * 检查路径是否存在于菜单中
 * @param path 需要检查的路径
 * @param items 菜单项数组
 */
  const isPathInMenu = (path: string, items: MenuItem[]): boolean => {
    for (const item of items) {
      if (item.key === path) return true;
      if (item.children?.length && isPathInMenu(path, item.children))
        return true;
    }
    return false;
  }

  /**
   * 获取默认选中的菜单项
   * 如果当前路径不在菜单中，返回第一个可用的菜单项
   */
  const getDefaultSelectedMenuItem = (items: MenuItem[]): string => {
    if (!items?.length) return '';
    const firstAvailableItem = items.find((item) => !item.hidden);
    return firstAvailableItem?.key || '';
  }
  /**
   * 根据路径生成展开的菜单键数组
   */
  const generateOpenKeys = (pathname: string): string[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const keys: string[] = [];
    let currentPath = '';

    for (const segment of pathSegments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : `/${segment}`;
      keys.push(currentPath);
    }

    return keys;
  }
  // 处理路由变化，更新菜单状态
  useEffect(() => {
    if (!menuItems?.length) return;

    const currentPath = location.pathname;

    // 检查当前路径是否在菜单中
    const isValidPath = isPathInMenu(currentPath, menuItems);
    // 如果当前路径在菜单中，设置当前路径为选中项
    if (isValidPath) {
      // 有效路径，设置当前路径为选中项
      setSelectedKeys([currentPath]);
      setOpenKeys(generateOpenKeys(currentPath));
    } else {
      // 无效路径，重定向到默认菜单项
      const defaultPath = getDefaultSelectedMenuItem(menuItems);
      if (defaultPath) {
        navigate(defaultPath);
        setSelectedKeys([defaultPath]);
        setOpenKeys(generateOpenKeys(defaultPath));
      }
    }
  }, [
    location.pathname,
    menuItems,
  ]);
  return {
    openKeys,
    selectedKeys,
    onOpenChange,
    handleItemClick,
    setSelectedKeys,
  }
}

export default useMenuActions;