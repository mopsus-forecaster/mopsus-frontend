import { AuthProvider } from '../contexts';

export const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
