import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from '../styles/auth.module.scss';
import { useForm } from '../../Hooks';
import { mopsusIcons } from '../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LoginCommonHeader } from './components/LoginCommonHeader';
import routes from '../../router/routes';

interface FormData {
  email: string;
  password: string;
}

const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};

  if (!form.email) {
    errors.email = 'El correo es requerido';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'El correo no es válido';
  } else if (form.email.length > 254) {
    errors.email = 'El correo no debe tener mas de 254 caracteres';
  }

  if (!form.password) {
    errors.password = 'La contraseña es requerida';
  } else if (form.password.length < 8 || form.password.length > 32) {
    errors.password = 'La contraseña debe tener entre 8 y 32 caracteres';
  }

  return errors;
};

export const Login = () => {
  const { login } = useContext(AuthContext);

  const [showPwd, setShowPwd] = useState(false);

  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      email: '',
      password: '',
    },
    validateForm
  );

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

  return (
    <article>
      <LoginCommonHeader title="Bienvenido" />
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onLogin);
        }}
      >
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder=" "
          />
          <label className={styles.labelline}>Correo</label>
          <Icon icon={mopsusIcons.mail} className={styles.icon} />
        </div>
        {errors.email && <p className={styles.errors}>{errors.email}</p>}
        <div className={`${styles.inputGroup} ${styles.pointer}`}>
          <input
            type={showPwd ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder=" "
          />
          <label className={styles.labelline}>Contraseña</label>
          <div onClick={() => setShowPwd(!showPwd)}>
            <Icon
              icon={showPwd ? mopsusIcons.lockOpen : mopsusIcons.lockClose}
              className={styles.icon}
            />
          </div>
        </div>
        {errors.password && <p className={styles.errors}>{errors.password} </p>}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className={styles.aBlock}>
        <p onClick={() => navigate(`/${routes.accountRecovery}`)}>
          ¿Olvidaste tu contraseña?
        </p>
        <p
          className={styles.blond}
          onClick={() => navigate(`/${routes.register}`)}
        >
          Crear una cuenta
        </p>
      </div>
    </article>
  );
};
