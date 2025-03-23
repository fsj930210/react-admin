import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';

import Icon from '@/components/RaIcon';

import useBreadcrumb from './hooks/useBreadcrumb';

import type { BreadcrumbItem } from '@/types/custom-types';
import type { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

const AppBreadcrumb = () => {
  const breadcrumbList = useBreadcrumb();

  function itemRender(
    currentRoute: BreadcrumbItem,
    _params: any,
    items: ItemType[],
  ) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    // 这里判断是最后一个或者是菜单时直接渲染，其他情况用Link组件渲染点击跳转到路由
    return isLast || currentRoute.menu ? (
      <>
        {currentRoute.icon ? <Icon icon={currentRoute.icon as string} /> : null}
        <span>{currentRoute.title}</span>
      </>
    ) : (
      <Link to={currentRoute.path as string}>{currentRoute.title}</Link>
    );
  }
  return (
    <div className="ml-[8px]">
      <Breadcrumb items={breadcrumbList} itemRender={itemRender} />
    </div>
  );
};

export default AppBreadcrumb;
