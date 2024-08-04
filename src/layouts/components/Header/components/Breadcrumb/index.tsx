import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/lib/breadcrumb/Breadcrumb';

import useMenuStore from '@/store/menu';

const AppBreadcrumb = () => {
  const { breadcrumbList } = useMenuStore();
  function itemRender(currentRoute: ItemType, _params: any, items: ItemType[]) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

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
