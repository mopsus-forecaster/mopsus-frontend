import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared';
import { Home, Inventory, Products, Sales } from '../modules';

import RequireAuth from './components/RequireAuth';
import { PersistLogin } from './components/PersistLogin';

export const PrivateRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="inicio" element={<Home />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="ventas" element={<Sales />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="productos" element={<Products />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="inventario" element={<Inventory />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<Navigate to={'/inicio'} />} />
        </Route>
      </Routes>
    </>
  );
};
