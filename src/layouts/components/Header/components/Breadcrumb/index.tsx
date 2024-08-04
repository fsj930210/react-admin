import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

import useMenuStore from '@/store/menu';

const AppBreadcrumb = () => {
  // 拿到面包屑列表
  const { breadcrumbList } = useMenuStore();
  function itemRender(currentRoute: ItemType, _params: any, items: ItemType[]) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    // 这里判断是最后一个或者是菜单时直接渲染，其他情况用Link组件渲染点击跳转到路由
    return isLast || currentRoute.menu ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={currentRoute.path as string}>{currentRoute.title}</Link>
    );
  }
  return (
    <div>
      <Breadcrumb items={breadcrumbList} itemRender={itemRender} />
    </div>
  );
};

export default AppBreadcrumb;
