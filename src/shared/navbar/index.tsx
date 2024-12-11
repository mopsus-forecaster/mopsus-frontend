import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from './Styles/navBar.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../icons';
import routes from '../../router/routes';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <nav className={styles.sideBar}>
      <Link className={styles.logo} to="/">
        <img src="public/logo/logoSinMopsus.png" alt="" />
      </Link>

      <div className={styles.navItems}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/inicio`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.stats} />
            <span>Inicio</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/ventas`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.sale} />
            <span>Ventas</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/productos`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.products} />
            <span>Productos</span>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/inventario`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.inventory} />
            <span>Stock</span>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/opciones`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.settings} />
            <span>Opciones</span>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.itemContainerActive : styles.itemContainer
          }
          to={`/usuarios`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.user} />
            <span>Usuarios</span>
          </div>
        </NavLink>

        <hr />
        <NavLink
          onClick={logout}
          className={styles.itemContainer}
          to={`${routes.login}`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.logOut} />
            <span>Cerrar sesion</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
