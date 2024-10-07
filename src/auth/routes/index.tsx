import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Login,
  LoginContainer,
  MFAContainer,
  RegisterNameEmail,
} from '../pages';
import { MfaFlow } from '../../types';
import routes from '../../router/routes';
import { MFAAuthenticator, NewPassword } from '../pages/components';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';
import { RegisterPassword } from '../pages/components/RegisterPassword';

export const LoginRoutes = () => {
  const { recoverEmail, prevRoute = '' } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />}>
        <Route
          index
          element={
            <Navigate to={routes.login} state={{ from: location }} replace />
          }
        />

        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.registerNameEmail}
          element={<RegisterNameEmail />}
        />

        <Route path={routes.registerPassword} element={<RegisterPassword />} />
        <Route
          path={routes.accountRecovery}
          element={<MFAContainer code={MfaFlow.AccountRecovery} />}
        />
        <Route path={routes.changePassword} element={<NewPassword />} />
        <Route
          path={routes.mfaAuthenticator}
          element={
            <MFAAuthenticator prevRoute={prevRoute} email={recoverEmail} />
          }
        />

        <Route path="*" element={<Navigate to={routes.login} />} />
      </Route>
    </Routes>
  );
};
