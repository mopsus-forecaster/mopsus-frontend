import styles from '../styles/auth.module.scss';
import { Outlet } from 'react-router-dom';

export const LoginContainer = () => {
  return (
    <section className={styles.backgroud}>
      <div className={styles.loginContainer}>
        <Outlet />
      </div>
    </section>
  );
};
