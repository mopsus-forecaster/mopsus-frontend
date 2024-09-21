import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

import { Login, MFAContainer, RegisterPage } from '../auth';
import { PublicRoutes } from './PublicRoutes';
import { LoginRoutes } from '../auth/routes';
import { useContext } from 'react';
import { AuthContext } from '../contexts';

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {!auth.logged ? (
          <Route
            path="/*"
            element={
              <PublicRoutes>
                <LoginRoutes />
              </PublicRoutes>
            }
          />
        ) : (
          <Route path="/*" element={<PrivateRoutes />} />
        )}
      </Routes>
    </>
  );
};
