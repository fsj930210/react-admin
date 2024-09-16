/**
 * 此组件用于二三级嵌套菜单
 */
import { Navigate, Outlet } from 'react-router-dom';

type RedirectRouteViewProps = {
  to: string;
};
const RedirectRouteView = ({ to }: RedirectRouteViewProps) => {
  console.log(to, 'to');
  return (
    <>
      <Navigate to={to} />
      <Outlet />
    </>
  );
};

export default RedirectRouteView;
