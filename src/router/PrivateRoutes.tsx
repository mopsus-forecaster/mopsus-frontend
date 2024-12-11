import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared';
import { Home, Inventory, ProductsPage, Sales } from '../modules';
import { NewInventorty } from '../modules/inventory/components/NewInventory';
import RequireAuth from './components/RequireAuth';
import styles from './styles/layout.module.scss';
import { NewSale } from '../modules/sales/components/NewSale';
import { NewAdjustment } from '../modules/inventory/components/NewAdjustment';
import { SettingsPage } from '../modules/settings/pages/SettingsPage';
import { Users } from '../modules/users/pages/Users';
import { NewProduct } from '../modules/products/components';
import { ModifyProduct } from '../modules/products/components/ModifyProduct';
export const PrivateRoutes = () => {
  return (
    <section className={styles.layout}>
      <Navbar />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="inicio" element={<Home />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="ventas" element={<Sales />} />
          <Route path="nueva-venta" element={<NewSale />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="productos" element={<ProductsPage />} />
          <Route>
            <Route path="nuevo-producto" element={<NewProduct />} />
          </Route>
          <Route>
            <Route path="modificar-producto" element={<ModifyProduct />} />
          </Route>
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="inventario" element={<Inventory />} />
          <Route>
            <Route path="nuevo-ingreso" element={<NewInventorty />} />
          </Route>
          <Route>
            <Route path="nuevo-ajuste" element={<NewAdjustment />} />
          </Route>
        </Route>
        <Route>
          <Route path="opciones" element={<SettingsPage />} />
        </Route>

        <Route>
          <Route path="usuarios" element={<Users />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Navigate to={'/inicio'} />} />
        </Route>
      </Routes>
    </section>
  );
};
