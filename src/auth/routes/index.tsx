import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, LoginContainer, RecoverAccount, RegisterPage } from '../pages';

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />}>
        <Route index element={<Navigate to="login" replace />} />

        <Route path="iniciar-sesion" element={<Login />} />
        <Route path="registro" element={<RegisterPage />} />
        <Route path="recuperar-cuenta" element={<RecoverAccount />} />
        <Route path="*" element={<Navigate to="iniciar-sesion" />} />
      </Route>
    </Routes>
  );
};
