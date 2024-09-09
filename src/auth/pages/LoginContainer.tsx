import React from 'react';
import styles from '../styles/auth.module.scss';
import { Outlet } from 'react-router-dom';

export const LoginContainer = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </section>
  );
};
