import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { defaultRouteByRole } from '../utils/routeUtils';

export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const defaultRoute = defaultRouteByRole(auth?.roles);

  const isRoleAllowed = auth?.roles?.some((role) =>
    allowedRoles.includes(role)
  );

  if (auth?.logged && isRoleAllowed) {
    return <Outlet />;
  }

  if (auth?.logged) {
    return <Navigate to={`/${defaultRoute}`} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
