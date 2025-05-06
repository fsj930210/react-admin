import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { BreadcrumbItem } from '@/types/custom-types';
import type { BreadcrumbProps } from 'antd';

import useSiderStoreSelector from '@/store/sider';

const useBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProps['items']>([]);
  const { flatMenuItems } = useSiderStoreSelector(['flatMenuItems']);
  // 生成面包屑项
  const generateBreadcrumbItem = (path: string): BreadcrumbItem | null => {
    const menu = flatMenuItems.find((r) => r.key === path);
    return {
      key: path,
      title: menu?.label || '',
      path,
      icon: menu?.['data-icon'] || null,
    };
  };

  // 生成面包屑列表
  const generateBreadcrumbs = (
    currentPath: string,
  ): BreadcrumbProps['items'] => {
    const breadcrumbs: BreadcrumbProps['items'] = [];
    const pathSegments = currentPath.split('/').filter(Boolean);
    const parentPath = `/${pathSegments.slice(0, -1).join('/')}`;
    const breadcrumbItem = generateBreadcrumbItem(currentPath);
    const parentBreadcrumbItem = generateBreadcrumbItem(parentPath);
    const parentMenu = flatMenuItems.find((r) => r.key === parentPath);
    // 生成面包屑项
    if (parentBreadcrumbItem && parentMenu?.children) {
      parentBreadcrumbItem.menu = {
        items: parentMenu.children,
        onClick: ({ key }) => navigate(key),
      };
      breadcrumbs.push(parentBreadcrumbItem);
    }
    if (breadcrumbItem) {
      breadcrumbs.push(breadcrumbItem);
    }
    return breadcrumbs;
  };

  // 获取当前路径的面包屑
  useEffect(() => {
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    setBreadcrumbs(breadcrumbs);
  }, [location.pathname, flatMenuItems]);

  return breadcrumbs;
};

export default useBreadcrumb;
