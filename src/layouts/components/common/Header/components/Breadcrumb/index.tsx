import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import RaAnimator from '@/components/RaAnimator';
import RaIcon from '@/components/RaIcon';

import useBreadcrumb from './hooks/useBreadcrumb';
import useCollapsibleBreadcrumb, {
  DEFAULT_COLLAPSE_CONFIG,
} from './hooks/useCollapsibleBreadcrumb';
import styles from './index.module.css';

import type { CollapseConfig } from './hooks/useCollapsibleBreadcrumb';
import type { BreadcrumbItem } from '@/types/custom-types';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

const AppBreadcrumb = ({
  collapseConfig,
}: {
  collapseConfig?: Partial<CollapseConfig>;
}) => {
  const breadcrumbList = useBreadcrumb();
  const [containerWidth, setContainerWidth] = useState(0);
  // 使用useRef替代useState来存储上一次的宽度
  const prevWidthRef = useRef(0);
  // 合并配置
  const mergedConfig = useMemo(
    () => ({
      ...DEFAULT_COLLAPSE_CONFIG,
      ...collapseConfig,
    }),
    [collapseConfig],
  );

  // 获取容器宽度
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用ResizeObserver监听容器尺寸变化
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;

        // 只有当宽度变化时才更新状态
        if (newWidth !== prevWidthRef.current) {
          setContainerWidth(newWidth);
          prevWidthRef.current = newWidth;
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  const prevList = useRef(breadcrumbList);
  // 使用折叠逻辑
  const { ref, visibleItems } = useCollapsibleBreadcrumb(
    breadcrumbList as BreadcrumbItem[],
    containerWidth,
    mergedConfig,
  );
  useEffect(() => {
    prevList.current = breadcrumbList;
  });
  // 精准计算变化起始点
  const changedIndex = useMemo(() => {
    let index = 0;
    while (
      index < (breadcrumbList?.length || 0) &&
      index < (prevList.current?.length || 0) &&
      breadcrumbList?.[index]?.path === prevList.current?.[index]?.path
    ) {
      index++;
    }
    prevList.current = breadcrumbList;
    return index;
  }, [breadcrumbList]);

  function itemRender(
    currentRoute: BreadcrumbItem,
    _params: any,
    items: ItemType[],
  ) {
    const isChanged = items.indexOf(currentRoute) >= changedIndex;
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    const content = (
      <React.Fragment key={currentRoute.key}>
        {
          // 这里判断是最后一个或者是菜单时直接渲染，其他情况用Link组件渲染点击跳转到路由
          isLast || currentRoute?.menu || currentRoute?.collapse ? (
            <span className="flex-center">
              {currentRoute.icon ? (
                <RaIcon fontSize={14} icon={currentRoute.icon as string} />
              ) : null}
              <span className="ml-[4px]">{currentRoute.title}</span>
            </span>
          ) : (
            <Link
              to={currentRoute.path as string}
              className="!flex items-center"
            >
              {currentRoute.icon ? (
                <RaIcon fontSize={14} icon={currentRoute.icon as string} />
              ) : null}
              <span className="ml-[4px]">{currentRoute.title}</span>
            </Link>
          )
        }
      </React.Fragment>
    );

    return (
      <RaAnimator
        animatekey={`${currentRoute.key}_anim`}
        config={{
          type: 'fadeRight',
          duration: 0.2,
          ease: 'easeOut',
          variants: {
            animate: isChanged ? {} : { opacity: 1 },
          },
        }}
      >
        {content}
      </RaAnimator>
    );
  }
  return (
    <div className="ml-[8px] relative" ref={containerRef}>
      <div ref={ref}>
        <Breadcrumb
          className={styles.breadcrumb}
          items={visibleItems}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
};

export default AppBreadcrumb;
