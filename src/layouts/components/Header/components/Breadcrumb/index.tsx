import { Link, useNavigate } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { cloneDeep } from 'lodash-es';

import Icon from '@/components/Icon';

import useBreadcrumb from '../../../../hooks/useBreadcrumb';

import type { BreadcrumbItem } from '@/types/custom-types';
import type { MenuProps } from 'antd/lib';
import type { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

const AppBreadcrumb = () => {
  const navigate = useNavigate();
  const breadcrumbList = useBreadcrumb();
  const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };
  // 这里做是因为localforage不能缓存函数
  const finalBreadcrumbList = cloneDeep(breadcrumbList)?.map((item) => {
    if (item.menu) {
      item.menu.onClick = handleMenuItemClick;
    }
    return item;
  });
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
        <span className="ml-[8]">{currentRoute.title}</span>
      </>
    ) : (
      <Link to={currentRoute.path as string}>{currentRoute.title}</Link>
    );
  }
  return (
    <div className="ml-[8px]">
      <Breadcrumb items={finalBreadcrumbList} itemRender={itemRender} />
    </div>
  );
};

export default AppBreadcrumb;
