import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Mopsus
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/inicio">
            Inicio
          </NavLink>
          <NavLink className="nav-item nav-link" to="/ventas">
            Ventas
          </NavLink>
          <NavLink className="nav-item nav-link" to="/productos">
            Productos
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventario">
            Inventario
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <NavLink onClick={logout} className="nav-item nav-link" to="/login">
            Logout
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};
