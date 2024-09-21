import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, LoginContainer, MFAContainer, RegisterPage } from '../pages';
import { MfaFlow } from '../../types';
import routes from '../../router/routes';
import { MFAAuthenticator, NewPassword } from '../pages/components';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';

export const LoginRoutes = () => {
  const { recoverEmail } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />}>
        <Route index element={<Navigate to={routes.login} replace />} />

        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route
          path={routes.accountRecovery}
          element={<MFAContainer code={MfaFlow.AccountRecovery} />}
        />
        <Route path={routes.changePassword} element={<NewPassword />} />
        <Route
          path={routes.mfaAuthenticator}
          element={<MFAAuthenticator email={recoverEmail} />}
        />

        <Route path="*" element={<Navigate to={routes.login} />} />
      </Route>
    </Routes>
  );
};
