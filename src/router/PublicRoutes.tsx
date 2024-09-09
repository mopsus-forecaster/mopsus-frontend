import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts';
import { useContext } from 'react';

export const PublicRoutes = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const { logged } = auth;
  console.log(logged)
  return !logged ? children : <Navigate to="inicio" />;
};
