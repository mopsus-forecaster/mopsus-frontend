import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from '../styles/auth.module.scss';
import { mopsusIcons } from '../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LoginCommonHeader } from './components/LoginCommonHeader';
import routes from '../../router/routes';
import { useForm } from '../../hooks';
import { ModalContext } from '../../contexts/modal/ModalContext';
import { resendCode, userLogin } from '../../services';
import { MfaFlow } from '../../types';

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
  const { login, comesFrom } = useContext(AuthContext);

  const [showPwd, setShowPwd] = useState(false);
  const from = comesFrom || routes.home;
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      email: '',
      password: '',
    },
    validateForm
  );

  const navigate = useNavigate();
  const {
    handleModalChange,
    handleOpen,
    handleSetRecoverEmail,
    handlesetPrevRoute,
  } = useContext(ModalContext);
  const onLogin = async () => {
    try {
      const {
        access_token: accessToken,
        name,
        refresh_token: refreshToken,
      } = await userLogin(form.email, form.password);
      login(name, accessToken, refreshToken);
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      const { errors } = error;

      switch (errors[0].status) {
        case 400:
          console.log(errors[0]);
          if (errors[0].message === 'User is not confirmed.') {
            handleModalChange({
              accept: {
                title: 'Ir a confirmar usuario',
                action: () => {},
              },
              reject: {
                title: 'Cancelar',
                action: () => {},
              },
              title: 'Usuario no confirmado',
              message:
                'Debe ingresar un código de autenticación para poder logearse.',
              icon: mopsusIcons.error,
            });
            handleOpen();
          }
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {},
            },
            title: 'Error en los campos',
            message: 'Usuario y/o contraseña incorrectos.',
            icon: mopsusIcons.error,
          });
          handleOpen();
          break;
        case 401:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: async () => {
                try {
                  const response = await resendCode(form.email);
                  console.log(response);
                  handleSetRecoverEmail(form.email);
                  handlesetPrevRoute(MfaFlow.AccountRecovery);
                  navigate(routes.mfaAuthenticator);
                } catch (error) {
                  console.log(error);
                  handleModalChange({
                    accept: {
                      title: 'Aceptar',
                      action: () => {},
                    },
                    title: 'Error técnico',
                    message:
                      'Lo sentimos, no pudimos completar su solicitud. Intente más tarde',
                    icon: mopsusIcons.error,
                  });
                  handleOpen();
                }
              },
            },
            title: 'Por seguridad hemos bloqueado su usuario',
            message: 'Para recuperarlo debe restaurar su contraseña.',
            icon: mopsusIcons.error,
          });
          handleOpen();
          break;

        default:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {},
            },
            title: 'Error técnico',
            message:
              'Lo sentimos, no pudimos completar su solicitud. Intente más tarde',
            icon: mopsusIcons.error,
          });
          handleOpen();

          break;
      }

      return;
    }
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
          onClick={() => navigate(`/${routes.registerNameEmail}`)}
        >
          Crear una cuenta
        </p>
      </div>
    </article>
  );
};
