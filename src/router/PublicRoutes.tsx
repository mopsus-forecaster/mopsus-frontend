import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts';
import { useContext } from 'react';
import { defaultRouteByRole } from './utils/routeUtils';

export const PublicRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const { logged } = auth;
  return !logged ? (
    children
  ) : (
    <Navigate to={`/${defaultRouteByRole(auth.roles)}`} replace />
  );
};
