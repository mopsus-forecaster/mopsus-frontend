import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../shared';
import { Home, Inventory, Products, Sales } from '../modules';
import { useContext } from 'react';
import { AuthContext } from '../contexts';

export const PrivateRoutes = () => {
  const { auth } = useContext(AuthContext);
  const { logged } = auth;
  console.log(logged);
  return logged ? (
    <>
      <Navbar />
      <Routes>
        <Route path="inicio" element={<Home />} />
        <Route path="ventas" element={<Sales />} />
        <Route path="productos" element={<Products />} />
        <Route path="inventario" element={<Inventory />} />
        <Route path="/*" element={<Navigate to={'/inicio'} />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
