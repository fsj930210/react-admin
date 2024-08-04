import { Navigate, Outlet } from 'react-router-dom';

type RouteViewProps = {
  to: string;
};
const RouteView = ({ to }: RouteViewProps) => {
  return (
    <>
      <Navigate to={to} />
      <Outlet />
    </>
  );
};

export default RouteView;
