import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from './Styles/navBar.module.scss'
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../icons';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navBar}>
        <Link className={styles.logo} to="/inicio">
          <img src="public/logo/logoSinMopsus.png" alt="" />
        </Link>
        <div className="">
          <div className="">
            <NavLink className={styles.navItem} to="/ventas">
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
          </div>
        </div>

        <div className="">
          <ul className="">
            <NavLink onClick={logout} className="" to="/login">
              Logout
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};
