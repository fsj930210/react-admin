import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { BreadcrumbItem } from '@/types/custom-types';
import type { MenuItem } from '@/types/menu';
import type { BreadcrumbProps } from 'antd/es';

import useLayoutStoreSelector from '@/store/layout';
import useMenuStoreSelector from '@/store/menu';

// 递归过滤菜单项，移除当前路径包含的所有item
const filterMenuItems = (items: MenuItem[], activePathSegments: string[]) => {
  return items.filter((item) => {
    const itemSegments = item.key.split('/').filter(Boolean);

    // 如果菜单项的路径是当前路径的前缀部分，则排除
    if (activePathSegments.join('/').startsWith(itemSegments.join('/'))) {
      return false;
    }

    // 递归处理子菜单
    if (item.children && item.children.length > 0) {
      const filteredChildren = filterMenuItems(
        item.children,
        activePathSegments,
      );
      if (filteredChildren.length > 0) {
        item.children = filteredChildren;
        return true;
      } else {
        return false;
      }
    }

    return true;
  });
};

const useBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProps['items']>([]);
  const { flatMenuItems } = useMenuStoreSelector(['flatMenuItems']);
  const { breadcrumbType } = useLayoutStoreSelector('breadcrumbType'); // 假设从全局配置获取面包crumb模式

  // 生成面包屑项
  const generateBreadcrumbItem = (path: string): BreadcrumbItem | null => {
    const menu = flatMenuItems[path];
    return {
      key: path,
      label: menu?.label || '',
      title: menu?.title || '',
      path,
      icon: menu?.iconify_name || null,
    };
  };

  // 生成完整的面包屑列表（处理所有层级的祖先路径）
  const generateBreadcrumbs = (
    currentPath: string,
  ): BreadcrumbProps['items'] => {
    const breadcrumbs: BreadcrumbProps['items'] = [];
    const pathSegments = currentPath.split('/').filter(Boolean);
    const activePathSegments = currentPath.split('/').filter(Boolean);

    // 逐级生成从根到当前路径的所有面包屑项
    for (let i = 0; i < pathSegments.length; i++) {
      const segmentPath = `/${pathSegments.slice(0, i + 1).join('/')}`;
      const breadcrumbItem = generateBreadcrumbItem(segmentPath);

      if (breadcrumbItem) {
        // 如果不是最后一级路径，说明是祖先路径，添加导航功能
        if (i < pathSegments.length - 1) {
          breadcrumbItem.onClick = () => navigate(segmentPath);
        }

        // 根据模式决定是否显示子菜单
        if (breadcrumbType === 'menu') {
          const menu = flatMenuItems[segmentPath];
          if (menu?.children && menu.children.length > 1) {
            // 仅当有多个子菜单时
            // 递归过滤菜单项，移除当前路径包含的所有item
            const filteredChildren = filterMenuItems(
              menu.children,
              activePathSegments,
            );

            if (filteredChildren.length > 0) {
              // 确保过滤后仍有子项
              breadcrumbItem.menu = {
                items: filteredChildren,
                onClick: ({ key }) => navigate(key),
              };
            }
          }
        }

        breadcrumbs.push(breadcrumbItem);
      }
    }

    return breadcrumbs;
  };

  // 获取当前路径的面包屑
  useEffect(() => {
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    setBreadcrumbs(breadcrumbs);
  }, [location.pathname, flatMenuItems, breadcrumbType]);

  return breadcrumbs;
};

export default useBreadcrumb;
