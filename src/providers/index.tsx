import { AuthProvider } from '../contexts';
import { HomeProvider } from '../contexts/home/HomeContext';
import { InventoryProvider } from '../contexts/Inventory/InventoryContext';
import { LoadingProvider } from '../contexts/loading/LoadingContext';
import { ModalProvider } from '../contexts/modal/ModalContext';
import { ProductsProvider } from '../contexts/Products/ProductsContext';
import { SalesProvider } from '../contexts/Sales/SalesContext';
import { SettingsProvider } from '../contexts/settings/SettingsContext';
import { UsersProvider } from '../contexts/users/UsersContext';

export const Providers = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <UsersProvider>
          <ModalProvider>
            <HomeProvider>
              <SettingsProvider>
                <ProductsProvider>
                  <SalesProvider>
                    <InventoryProvider>{children}</InventoryProvider>
                  </SalesProvider>
                </ProductsProvider>
              </SettingsProvider>
            </HomeProvider>
          </ModalProvider>
        </UsersProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};
