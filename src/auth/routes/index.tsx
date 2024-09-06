import { Route, Routes } from 'react-router-dom';
import { Login, RecoverAccount, RegisterPage } from '../pages';

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/recuperar-cuenta" element={<RecoverAccount />} />
    </Routes>
  );
};
