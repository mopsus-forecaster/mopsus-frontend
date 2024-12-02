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
import { CircularProgress } from '@mui/material';
import { LoadingContext } from '../../contexts/loading/LoadingContext';

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
  const {
    login,
    comesFrom,
    handleSetRecoverEmail,
    handlesetPrevRoute,
    setCurrentMfaFlow,
  } = useContext(AuthContext);
  const { setShowLoading } = useContext(LoadingContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const from = comesFrom || routes.home;
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      email: '',
      password: '',
    },
    validateForm
  );

  const onResendCode = async () => {
    try {
      setShowLoading(true);
      const response = await resendCode(form.email);
      if (response) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              handleSetRecoverEmail(form.email);
              setCurrentMfaFlow(MfaFlow.RegisterPage);
              handlesetPrevRoute(MfaFlow.RegisterPage);
              navigate(`/${routes.mfaAuthenticator}`);
            },
          },
          title: 'Codigo enviado',
          message:
            'Hemos enviado un codigo a su correo electronico. Pulse aceptar y podra continuar con el alta de la cuenta',
        });
        handleOpen();
      }
    } catch (error) {
      setShowLoading(false);
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
    } finally {
      setShowLoading(false);
    }
  };

  const navigate = useNavigate();
  const { handleModalChange, handleOpen } = useContext(ModalContext);
  const onLogin = async () => {
    try {
      setIsLoading(true);
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
        case 428:
          handleModalChange({
            accept: {
              title: 'Ir a confirmar usuario',
              action: () => {
                onResendCode();
              },
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

          break;
        case 401:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: async () => {
                try {
                  const response = await resendCode(form.email);
                  if (response) {
                    handleSetRecoverEmail(form.email);
                    setCurrentMfaFlow(MfaFlow.BlockedAccountRecovery);
                    handlesetPrevRoute(MfaFlow.BlockedAccountRecovery);
                    navigate(`/${routes.changePassword}`);
                  }
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
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <CircularProgress sx={{ opacity: 100, color: '#4a7370' }} />
        ) : (
          <div className={styles.inputGroup}>
            <button type="submit" className={styles.btn}>
              Iniciar Sesión
            </button>
          </div>
        )}
      </form>
      {!isLoading && (
        <div className={styles.aBlock}>
          <p
            onClick={() => {
              setCurrentMfaFlow(MfaFlow.AccountRecovery);
              navigate(`/${routes.accountRecovery}`);
            }}
          >
            ¿Olvidaste tu contraseña?
          </p>
          <p
            className={styles.blond}
            onClick={() => navigate(`/${routes.registerNameEmail}`)}
          >
            Crear una cuenta
          </p>
        </div>
      )}
    </article>
  );
};
