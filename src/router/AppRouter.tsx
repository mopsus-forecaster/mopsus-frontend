import { Route, Routes, useLocation } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

import { PublicRoutes } from './PublicRoutes';
import { LoginRoutes } from '../auth/routes/LoginRoutes';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts';

export const AppRouter = () => {
  const { auth, setComesFrom } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!auth.logged && location.pathname !== '/login') {
      setComesFrom(location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {!auth.logged ? (
          <Route
            path="*"
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
