import { AuthProvider } from '../contexts';
import { ModalProvider } from '../contexts/modal/ModalContext';
import { ProductsProvider } from '../contexts/Products/ProductsContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </ModalProvider>
    </AuthProvider>
  );
};
