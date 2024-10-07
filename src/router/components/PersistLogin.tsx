import { useEffect, useState } from 'react';
import { useRefreshToken } from '../../hooks/useRefreshToken/useRefreshToken';
import useAuth from '../../hooks/useAuth/useAuth';
import { Outlet } from 'react-router-dom';

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    };
  }, []);

  return <>{isLoading ? null : <Outlet />}</>;
};
