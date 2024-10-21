import { AuthProvider } from '../contexts';
import { ModalProvider } from '../contexts/modal/ModalContext';
import { ProductsProvider } from '../contexts/Products/ProductsContext';
import { SalesProvider } from '../contexts/Sales/SalesContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ProductsProvider>
          <SalesProvider>
            {children}
          </SalesProvider>
        </ProductsProvider>
      </ModalProvider>
    </AuthProvider>
  );
};
