import { useContext, useState } from 'react';
import { useForm } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LoginCommonHeader } from './LoginCommonHeader';
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import routes from '../../../router/routes';
import styles from '../../styles/auth.module.scss';
import { AuthContext } from '../../../contexts';
import { MfaFlow } from '../../../types';
import { createUser } from '../../../services';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';

interface FormData {
  password: string;
  passwordConfirmation: string;
}

const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};
  if (!form.password) {
    errors.password = 'La contraseña es requerida';
  } else if (form.password.length < 8 || form.password.length > 32) {
    errors.password = 'La contraseña debe tener entre 8 y 32 caracteres';
  } else if (!/[!@#$%^&*(),.?":{}|<>+\-]/.test(form.password)) {
    errors.password = 'La contraseña debe contener al menos un símbolo';
  }

  if (!form.passwordConfirmation) {
    errors.passwordConfirmation =
      'La confirmación de la contraseña es requerida';
  } else if (form.password !== form.passwordConfirmation) {
    errors.passwordConfirmation = 'Las contraseñas no coinciden';
  }

  return errors;
};
export const RegisterPassword = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      password: '',
      passwordConfirmation: '',
    },
    validateForm
  );
  const {
    handleSetRecoverEmail,
    handlesetPrevRoute,
    registerData,
    setCurrentMfaFlow,
  } = useContext(AuthContext);

  const { name, email } = registerData;
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const navigate = useNavigate();
  const { setShowLoading } = useContext(LoadingContext);

  const handleNavigation = async () => {
    try {
      setShowLoading(true);
      const response = await createUser(email, form.password, name);
      if (response) {
        handleSetRecoverEmail(email);
        handlesetPrevRoute(MfaFlow.RegisterPage);
        setCurrentMfaFlow(MfaFlow.RegisterPage);
        navigate(`/${routes.mfaAContainer}`);
      }
    } catch ({ errors }) {
      setShowLoading(false);
      switch (errors[0].status) {
        case 400:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {
                navigate(routes.login);
              },
            },
            title: 'Usuario existente',
            message: 'El correo que intenta usar se encuentra en uso',
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
    } finally {
      setShowLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(handleNavigation);
  };

  return (
    <article className={styles.mfaContainer}>
      <LoginCommonHeader title="Registrar Usuario" />
      <form onSubmit={onSubmit}>
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
        {errors.password && <p className={styles.errors}>{errors.password}</p>}

        <div className={`${styles.inputGroup} ${styles.pointer}`}>
          <input
            type={showConfirmPwd ? 'text' : 'password'}
            name="passwordConfirmation"
            onChange={handleChange}
            value={form.passwordConfirmation}
            placeholder=" "
          />
          <label className={styles.labelline}>Confirmar Contraseña</label>
          <div onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
            <Icon
              icon={
                showConfirmPwd ? mopsusIcons.lockOpen : mopsusIcons.lockClose
              }
              className={styles.icon}
            />
          </div>
        </div>
        {errors.passwordConfirmation && (
          <p className={styles.errors}>{errors.passwordConfirmation}</p>
        )}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Crear Cuenta
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.login}`)}>¿Ya tienes cuenta?</p>
        </div>
      </form>
    </article>
  );
};
