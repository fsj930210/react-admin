/**
 * 此组件用于二三级嵌套菜单
 */
import { Navigate, Outlet } from 'react-router-dom';

type RedirectRouteViewProps = {
  to: string;
};
const RedirectRouteView = ({ to }: RedirectRouteViewProps) => {
  return (
    <>
      <Navigate to={to} replace />
      <Outlet />
    </>
  );
};

export default RedirectRouteView;
