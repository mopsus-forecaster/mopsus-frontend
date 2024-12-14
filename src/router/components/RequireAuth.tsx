import { useContext } from 'react';
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { defaultRouteByRole } from '../utils/routeUtils';

export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isRoleAllowed = (roles) => {
    let isAllowed = false;

    roles.forEach((role) => {
      if (allowedRoles.includes(role)) {
        isAllowed = true;
        return;
      }
    });
    return isAllowed;
  };

  if (auth?.logged && isRoleAllowed(auth.roles)) {
    return <Outlet />;
  } else if (auth?.logged) {
    navigate(`/${defaultRouteByRole(auth.roles)}`);
  } else {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
};
