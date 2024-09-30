import { useContext, useState } from "react";
import { useForm } from "../../Hooks";
import { useNavigate } from "react-router-dom";
import { LoginCommonHeader } from "./components/LoginCommonHeader";
import { Icon } from "@iconify/react/dist/iconify.js";
import { mopsusIcons } from "../../icons";
import routes from "../../router/routes";
import styles from '../styles/auth.module.scss';
import { AuthContext } from "../../contexts";
import { MfaFlow } from '../../types';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
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

  if (!form.passwordConfirmation) {
    errors.passwordConfirmation = 'La confirmación de la contraseña es requerida';
  } else if (form.password !== form.passwordConfirmation) {
    errors.passwordConfirmation = 'Las contraseñas no coinciden';
  }

  return errors;
};

export const RegisterPage = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validateForm
  );

  const { handleSetRecoverEmail, handlesetPrevRoute } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = () => {
    handleSetRecoverEmail(form.email);
    handlesetPrevRoute(MfaFlow.RegisterPage)
    navigate(`/${routes.mfaAuthenticator}`)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(handleNavigation)
  };



  return (
    <article className={styles.mfaContainer}>
      <LoginCommonHeader title="Registrar Usuario" />
      <form onSubmit={onSubmit}>
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
              icon={showConfirmPwd ? mopsusIcons.lockOpen : mopsusIcons.lockClose}
              className={styles.icon}
            />
          </div>
        </div>
        {errors.passwordConfirmation && <p className={styles.errors}>{errors.passwordConfirmation}</p>}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Crear Cuenta
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.login}`)}>
            ¿Ya tienes cuenta?
          </p>
        </div>
      </form>
    </article>
  );
};
