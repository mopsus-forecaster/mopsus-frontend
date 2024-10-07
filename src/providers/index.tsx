import { AuthProvider } from '../contexts';
import { ModalProvider } from '../contexts/modal/ModalContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
};
