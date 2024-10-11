import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from './Styles/navBar.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../icons';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className={styles.backgroud}>
      <nav className={styles.sideBar}>
        <Link className={styles.logo} to="/">
          <img src="public/logo/logoSinMopsus.png" alt="" />
        </Link>
        <div className={styles.navItems}>
          <div className={styles.itemContainer}>
            <NavLink className={styles.navItem} to="/ventas">
              <Icon icon={mopsusIcons.sale} />
            </NavLink>
            <span>Ventas</span>
          </div>
          <div className={styles.itemContainer}>
            <NavLink className={styles.navItem} to="/productos">
              <Icon icon={mopsusIcons.products} />
            </NavLink>
            <span>Productos</span>
          </div>
          <div className={styles.itemContainer}>
            <NavLink className={styles.navItem} to="/">
              <Icon icon={mopsusIcons.stats} />
            </NavLink>
            <span>Estadisticas</span>
          </div>
          <div className={styles.itemContainer}>
            <NavLink className={styles.navItem} to="/inventario">
              <Icon icon={mopsusIcons.inventory} />
            </NavLink>
            <span>Inventario</span>
          </div>

          <hr />
          <div className={styles.itemContainer}>
            <NavLink onClick={logout} className={styles.navItem} to="/login">
              <Icon icon={mopsusIcons.logOut} />
            </NavLink>
            <span>Cerrar Sesion</span>
          </div>
        </div>
      </nav>
    </div>
  );
};
