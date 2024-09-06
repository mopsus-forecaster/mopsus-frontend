import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

import { Login, RecoverAccount, RegisterPage } from '../auth';

export const AppRouter = () => {
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
