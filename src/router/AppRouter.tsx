import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { useContext } from 'react';
import { Login, RecoverAccount, RegisterPage } from '../auth';
import { AuthContext } from '../contexts';

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {/* TODO: CAMBIA POR  PUBLIC ROUTES Y LOGIN ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/recuperar-cuenta" element={<RecoverAccount />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </>
  );
};
