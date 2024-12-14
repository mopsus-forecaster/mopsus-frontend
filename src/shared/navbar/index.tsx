import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from './Styles/navBar.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../icons';
import routes from '../../router/routes';
import { ROLES_ENUM } from '../../router/PrivateRoutes';

export const Navbar = () => {
  const { logout, auth } = useContext(AuthContext);

  return (
    <nav className={styles.sideBar}>
      <Link className={styles.logo} to="/">
        <img src="public/logo/logoSinMopsus.png" alt="" />
      </Link>

      <div className={styles.navItems}>
        {(auth.roles.includes(ROLES_ENUM.admin) ||
          auth.roles.includes(ROLES_ENUM.reports_operator)) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/inicio`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.stats} />
              <span className={styles.span}>Inicio</span>
            </div>
          </NavLink>
        )}

        {(auth.roles.includes(ROLES_ENUM.sales_operator) ||
          auth.roles.includes(ROLES_ENUM.admin)) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/ventas`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.sale} />
              <span className={styles.span}>Ventas</span>
            </div>
          </NavLink>
        )}

        {(auth.roles.includes(ROLES_ENUM.sales_operator) ||
          auth.roles.includes(ROLES_ENUM.incomes_operator) ||
          auth.roles.includes(ROLES_ENUM.admin)) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/productos`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.products} />
              <span className={styles.span}>Productos</span>
            </div>
          </NavLink>
        )}

        {(auth.roles.includes(ROLES_ENUM.incomes_operator) ||
          auth.roles.includes(ROLES_ENUM.admin)) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/inventario`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.inventory} />
              <span className={styles.span}>Stock</span>
            </div>
          </NavLink>
        )}

        {(auth.roles.includes(ROLES_ENUM.incomes_operator) ||
          auth.roles.includes(ROLES_ENUM.sales_operator) ||
          auth.roles.includes(ROLES_ENUM.admin)) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/opciones`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.settings} />
              <span className={styles.span}>Opciones</span>
            </div>
          </NavLink>
        )}

        {auth.roles.includes(ROLES_ENUM.admin) && (
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.itemContainerActive : styles.itemContainer
            }
            to={`/usuarios`}
          >
            <div className={styles.navItem}>
              <Icon icon={mopsusIcons.user} />
              <span className={styles.span}>Usuarios</span>
            </div>
          </NavLink>
        )}

        <hr />

        <NavLink
          onClick={logout}
          className={styles.itemContainer}
          to={`${routes.login}`}
        >
          <div className={styles.navItem}>
            <Icon icon={mopsusIcons.logOut} />
            <span className={styles.span}>Cerrar sesión</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
