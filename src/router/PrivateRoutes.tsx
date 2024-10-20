import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared';
import { Home, Inventory, ProductsPage, Sales } from '../modules';

import RequireAuth from './components/RequireAuth';
import styles from './styles/layout.module.scss';
import { NewSale } from '../modules/sales/components/NewSale';
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
          <Route path='nueva-venta' element={<NewSale />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="productos" element={<ProductsPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="inventario" element={<Inventory />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Navigate to={'/inicio'} />} />
        </Route>
      </Routes>
    </section>
  );
};
