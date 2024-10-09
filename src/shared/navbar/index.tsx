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
          <div>
            <NavLink className={styles.navSale} to="/ventas">
              <Icon icon={mopsusIcons.sale} />
            </NavLink>
            <NavLink className={styles.navItem} to="/productos">
              <Icon icon={mopsusIcons.products} />
            </NavLink>
            <NavLink className={styles.navItem} to="/">
              <Icon icon={mopsusIcons.stats} />
            </NavLink>
            <NavLink className={styles.navItem} to="/inventario">
              <Icon icon={mopsusIcons.inventory} />
            </NavLink>
            <hr />
          </div>
          <div className={styles.ItemLog}>
            <NavLink onClick={logout} className={styles.navLogOut} to="/login">
              <Icon icon={mopsusIcons.logOut} />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
