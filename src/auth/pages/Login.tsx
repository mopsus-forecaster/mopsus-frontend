import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from '../styles/auth.module.scss';
import { useForm } from '../../Hooks/useForm';
import { mopsusIcons } from '../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const { login } = useContext(AuthContext);
  const { form, handleChange } = useForm<FormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const onLogin = () => {
    login({
      id: 1,
      username: 'John Doe',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
    navigate('/inicio', {
      replace: true,
    });
  };

  const viewPass = () => {

  }


  return (
    <div className={styles.loginContainer}>
      <div className={styles.logo}></div>
      <h4>Bienvenido</h4>
      <form onSubmit={onLogin}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder=" "
            required
          />
          <div className={styles.labelline}>Correo</div>
          <Icon icon={mopsusIcons.mail} className={styles.icon} />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder=" "
            required
          />
          <div className={styles.labelline}>Contraseña</div>
          <Icon icon={mopsusIcons.lockClose} className={styles.icon} onClick={viewPass} />
        </div>

        <div className={styles.inputGroup}>
          <p className={styles.errors}>Error</p>
        </div>


        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className={styles.aBlock}>
        <p onClick={() => navigate('/recuperar-cuenta')}>
          ¿Olvidaste tu contraseña?
        </p>
        <p className={styles.blond} onClick={() => navigate('/registro')}>
          Crear una cuenta
        </p>
      </div>
    </div>
  );
};

