import { AuthProvider } from '../contexts';
import { HomeProvider } from '../contexts/home/HomeContext';
import { InventoryProvider } from '../contexts/Inventory/InventoryContext';
import { ModalProvider } from '../contexts/modal/ModalContext';
import { ProductsProvider } from '../contexts/Products/ProductsContext';
import { SalesProvider } from '../contexts/Sales/SalesContext';
import { SettingsProvider } from '../contexts/settings/SettingsContext';

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <HomeProvider>
          <ProductsProvider>
            <SalesProvider>
              <SettingsProvider>
                <InventoryProvider>{children}</InventoryProvider>
              </SettingsProvider>
            </SalesProvider>
          </ProductsProvider>
        </HomeProvider>
      </ModalProvider>
    </AuthProvider>
  );
};
