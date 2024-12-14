import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared';
import { Home, Inventory, ProductsPage, Sales } from '../modules';
import { NewInventorty } from '../modules/inventory/components/NewInventory';
import styles from './styles/layout.module.scss';
import { NewSale } from '../modules/sales/components/NewSale';
import { NewAdjustment } from '../modules/inventory/components/NewAdjustment';
import { SettingsPage } from '../modules/settings/pages/SettingsPage';
import { Users } from '../modules/users/pages/Users';
import { NewProduct } from '../modules/products/components';
import { ModifyProduct } from '../modules/products/components/ModifyProduct';
import { RequireAuth } from './components/RequireAuth';
import { defaultRouteByRole } from './utils/routeUtils';
import { AuthContext } from '../contexts';
import { useContext } from 'react';

export enum ROLES_ENUM {
  admin = 'admin',
  sales_operator = 'operador_ventas',
  incomes_operator = 'operador_ingresos',
  reports_operator = 'operador_reportes',
}
export const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <section className={styles.layout}>
      <Navbar />
      <Routes>
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES_ENUM.admin, ROLES_ENUM.reports_operator]}
            />
          }
        >
          <Route path="inicio" element={<Home />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES_ENUM.admin, ROLES_ENUM.sales_operator]}
            />
          }
        >
          <Route path="ventas" element={<Sales />} />
          <Route path="nueva-venta" element={<NewSale />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES_ENUM.admin,
                ROLES_ENUM.incomes_operator,
                ROLES_ENUM.sales_operator,
              ]}
            />
          }
        >
          <Route path="productos" element={<ProductsPage />} />
          <Route>
            <Route path="nuevo-producto" element={<NewProduct />} />
          </Route>
          <Route>
            <Route path="modificar-producto" element={<ModifyProduct />} />
          </Route>
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES_ENUM.admin, ROLES_ENUM.incomes_operator]}
            />
          }
        >
          <Route path="inventario" element={<Inventory />} />
          <Route>
            <Route path="nuevo-ingreso" element={<NewInventorty />} />
          </Route>
          <Route>
            <Route path="nuevo-ajuste" element={<NewAdjustment />} />
          </Route>
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES_ENUM.admin,
                ROLES_ENUM.sales_operator,
                ROLES_ENUM.incomes_operator,
              ]}
            />
          }
        >
          <Route path="opciones" element={<SettingsPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES_ENUM.admin]} />}>
          <Route path="usuarios" element={<Users />} />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES_ENUM.admin,
                ROLES_ENUM.reports_operator,
                ROLES_ENUM.incomes_operator,
                ROLES_ENUM.sales_operator,
              ]}
            />
          }
        >
          <Route
            path="/*"
            element={
              <Navigate to={`/${defaultRouteByRole(auth.roles)}`} replace />
            }
          />
        </Route>
      </Routes>
    </section>
  );
};
