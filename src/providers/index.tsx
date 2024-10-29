import { AuthProvider } from '../contexts';
import { InventoryProvider } from '../contexts/Inventory/InventoryContext';
import { ModalProvider } from '../contexts/modal/ModalContext';
import { ProductsProvider } from '../contexts/Products/ProductsContext';
import { SalesProvider } from '../contexts/Sales/SalesContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ProductsProvider>
          <SalesProvider>
            <InventoryProvider>
              {children}
            </InventoryProvider>
          </SalesProvider>
        </ProductsProvider>
      </ModalProvider>
    </AuthProvider>
  );
};
