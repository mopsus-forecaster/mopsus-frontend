import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Login,
  LoginContainer,
  MFAContainer,
  RegisterNameEmail,
} from '../pages';
import routes from '../../router/routes';
import {
  AccountRecovery,
  MFAAuthenticator,
  NewPassword,
} from '../pages/components';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { RegisterPassword } from '../pages/components/RegisterPassword';

export const LoginRoutes = () => {
  const { currentMfaFlow } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />}>
        <Route index element={<Navigate to={routes.login} />} />

        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.registerNameEmail}
          element={<RegisterNameEmail />}
        />

        <Route path={routes.accountRecovery} element={<AccountRecovery />} />

        <Route path={routes.mfaAuthenticator} element={<MFAAuthenticator />} />

        <Route path={routes.registerPassword} element={<RegisterPassword />} />

        <Route path={routes.changePassword} element={<NewPassword />} />
        <Route
          path={routes.mfaAContainer}
          element={<MFAContainer code={currentMfaFlow} />}
        />

        <Route path="*" element={<Navigate to={routes.login} />} />
      </Route>
    </Routes>
  );
};
