import { useEffect, useMemo, useRef } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import RaAnimator from '@/components/RaAnimator';
import RaIcon from '@/components/RaIcon';

import useBreadcrumb from './hooks/useBreadcrumb';
import styles from './index.module.css';

import type { BreadcrumbItem } from '@/types/custom-types';
import type { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

const AppBreadcrumb = () => {
  const breadcrumbList = useBreadcrumb();
  console.log(breadcrumbList);
  const prevList = useRef(breadcrumbList);

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
          isLast || currentRoute?.menu ? (
            <span>
              {currentRoute.icon ? (
                <RaIcon fontSize={14} icon={currentRoute.icon as string} />
              ) : null}
              <span>{currentRoute.title}</span>
            </span>
          ) : (
            <Link to={currentRoute.path as string}>
              {currentRoute.icon ? (
                <RaIcon fontSize={14} icon={currentRoute.icon as string} />
              ) : null}
              <span> {currentRoute.title}</span>
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
    <div className="ml-[8px] relative">
      <Breadcrumb
        className={styles.breadcrumb}
        items={breadcrumbList}
        itemRender={itemRender}
      />
    </div>
  );
};

export default AppBreadcrumb;
