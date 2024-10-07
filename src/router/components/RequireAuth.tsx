import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts';

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return auth?.logged ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
