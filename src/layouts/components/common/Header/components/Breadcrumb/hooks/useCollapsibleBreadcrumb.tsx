import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from 'antd';

import RaIcon from '@/components/RaIcon';

import type { BreadcrumbItem } from '@/types/custom-types';

import useMenuStoreSelector from '@/store/menu';

// 面包屑折叠策略类型
type CollapseStrategy = 'middle' | 'trailing' | 'leading';

// 面包屑折叠配置
export interface CollapseConfig {
  enabled: boolean;
  strategy?: CollapseStrategy;
  minVisibleItems?: number;
}

// 默认折叠配置
export const DEFAULT_COLLAPSE_CONFIG: CollapseConfig = {
  enabled: true,
  strategy: 'middle',
  minVisibleItems: 2,
};

// 封装面包屑折叠逻辑的自定义hook
const useCollapsibleBreadcrumb = (
  breadcrumbList: BreadcrumbItem[],
  containerWidth: number,
  config: CollapseConfig = DEFAULT_COLLAPSE_CONFIG,
) => {
  const [visibleItems, setVisibleItems] =
    useState<BreadcrumbItem[]>(breadcrumbList);
  const [collapsedItems, setCollapsedItems] = useState<BreadcrumbItem[]>([]);
  const { flatMenuItems } = useMenuStoreSelector(['flatMenuItems']);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // 创建测量容器
  const measurementContainerRef = useRef<HTMLDivElement | null>(null);

  // 初始化测量容器
  useEffect(() => {
    if (!measurementContainerRef.current) {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.visibility = 'hidden';
      container.style.whiteSpace = 'nowrap';
      container.style.pointerEvents = 'none';
      container.className = 'breadcrumb-measurement-container';

      document.body.appendChild(container);
      measurementContainerRef.current = container;
    }

    return () => {
      if (measurementContainerRef.current) {
        document.body.removeChild(measurementContainerRef.current);
        measurementContainerRef.current = null;
      }
    };
  }, []);

  // 计算面包屑项的宽度总和
  const calculateItemsWidth = (items: BreadcrumbItem[]) => {
    if (!measurementContainerRef.current) return 0;

    // 清空测量容器
    measurementContainerRef.current.innerHTML = '';

    let totalWidth = 0;

    items.forEach((item) => {
      const itemElement = document.createElement('span');
      itemElement.innerHTML = `
        <span class="flex-center">
          ${item.icon ? `<i class="anticon" style="font-size: 14px;">${item.icon}</i>` : ''}
          <span class="ml-[4px]">${item.title}</span>
        </span>
      `;
      measurementContainerRef.current?.appendChild?.(itemElement);

      // 添加分隔符宽度（/ 的平均宽度）
      totalWidth += itemElement.offsetWidth + 24;
    });

    return totalWidth;
  };

  // 根据折叠策略处理面包屑项
  const processItemsByStrategy = (
    items: BreadcrumbItem[],
    collapseCount: number,
  ) => {
    if (items.length <= (config.minVisibleItems || 0)) {
      return { visible: items, collapsed: [] };
    }

    switch (config.strategy) {
      case 'middle': {
        const visibleCount = items.length - collapseCount;
        const leftCount = Math.ceil(visibleCount / 2);
        const rightCount = Math.floor(visibleCount / 2);

        const leftItems = items.slice(0, leftCount);
        const rightItems = items.slice(-rightCount);
        const middleItems = items.slice(leftCount, items.length - rightCount);

        return {
          visible: [...leftItems, ...rightItems],
          collapsed: middleItems,
        };
      }

      case 'trailing': {
        const visibleCount = Math.max(
          config.minVisibleItems || 0,
          items.length - collapseCount,
        );
        return {
          visible: items.slice(0, visibleCount),
          collapsed: items.slice(visibleCount),
        };
      }

      case 'leading': {
        const visibleCount = Math.max(
          config.minVisibleItems || 0,
          items.length - collapseCount,
        );
        return {
          visible: items.slice(-visibleCount),
          collapsed: items.slice(0, items.length - visibleCount),
        };
      }

      default:
        return { visible: items, collapsed: [] };
    }
  };

  // 处理面包屑折叠逻辑
  const handleCollapse = () => {
    if (!config.enabled || !ref.current) {
      setVisibleItems(breadcrumbList);
      setCollapsedItems([]);
      return;
    }

    const totalItemsWidth = calculateItemsWidth(breadcrumbList);

    if (
      totalItemsWidth <= containerWidth ||
      breadcrumbList.length <= (config.minVisibleItems || 0)
    ) {
      setVisibleItems(breadcrumbList);
      setCollapsedItems([]);
      return;
    }

    // 计算需要折叠的项数
    let collapseCount = 1;
    let processedItems = processItemsByStrategy(breadcrumbList, collapseCount);

    while (
      calculateItemsWidth([
        ...processedItems.visible,
        { key: 'collapse', title: '...' },
      ]) > containerWidth &&
      breadcrumbList.length - collapseCount > (config.minVisibleItems || 0)
    ) {
      collapseCount++;
      processedItems = processItemsByStrategy(breadcrumbList, collapseCount);
    }

    setVisibleItems(processedItems.visible);
    setCollapsedItems(processedItems.collapsed);
  };

  // 监听面包屑列表变化
  useEffect(() => {
    handleCollapse();
  }, [breadcrumbList, containerWidth, config]);

  // 创建折叠项
  const createCollapsedItem = () => {
    if (collapsedItems.length === 0)
      return { key: 'collapse', collapse: false };
    const items = collapsedItems.map((item) => ({
      key: item.path as string,
      icon: item.icon ? (
        <RaIcon icon={item.icon as string} fontSize={14} />
      ) : undefined,
      label: item.label,
      children: item.menu?.items || undefined,
      title: item.title as string,
    }));
    return {
      key: 'collapse',
      collapse: true,
      title: (
        <Dropdown
          menu={{
            items: items,
            onClick: ({ key }) => {
              const item = flatMenuItems[key];
              if (!item || item.disabled) return;
              if (item?.open_mode === 'newBrowserTab') {
                window.open(item?.path, '_blank');
              } else {
                navigate(key);
              }
            },
          }}
          trigger={['click']}
        >
          <span className="cursor-pointer flex items-center">
            <RaIcon fontSize={14} icon="lucide:ellipsis" />
          </span>
        </Dropdown>
      ),
    } as BreadcrumbItem;
  };

  return {
    ref,
    visibleItems:
      collapsedItems.length > 0
        ? [
            ...visibleItems.slice(0, -1),
            createCollapsedItem(),
            visibleItems.slice(-1)[0],
          ]
        : visibleItems,
  };
};

export default useCollapsibleBreadcrumb;
