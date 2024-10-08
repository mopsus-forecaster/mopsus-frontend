import { LoginCommonHeader } from './LoginCommonHeader';
import styles from '../../styles/auth.module.scss';
import { useForm } from '../../../hooks';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts';
import { MfaFlow } from '../../../types';

type FormData = {
  email: string;
};

const INITIAL_STATE = {
  email: '',
};
const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};

  const { email } = form;

  if (!email) {
    errors.email = 'El correo es requerido';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'El correo no es válido';
  } else if (email.length > 254) {
    errors.email = 'El correo no debe tener mas de 254 caracteres';
  }

  return errors;
};
export const AccountRecovery = () => {
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    INITIAL_STATE,
    validateForm
  );
  const { handleSetRecoverEmail, handlesetPrevRoute } = useContext(AuthContext);
  const { email } = form;
  const navigate = useNavigate();

  const handleNavigation = async () => {
    handleSetRecoverEmail(email);
    handlesetPrevRoute(MfaFlow.AccountRecovery);
    navigate(`/${routes.changePassword}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(handleNavigation);
  };
  return (
    <article className={styles.mfaContainer}>
      <div>
        <LoginCommonHeader title="Recuperar cuenta" />
        <p className={styles.accountRecoveryText}>
          Ingrese su correo para recibr un código de autenticación
        </p>
      </div>
      <form onSubmit={onSubmit} action="">
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
            placeholder=" "
          />
          <label className={styles.labelline}>Correo</label>
          <Icon icon={mopsusIcons.mail} className={styles.icon} />
        </div>
        {errors.email && <p className={styles.errors}>{errors.email}</p>}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Siguiente paso
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.login}`)}>Volver</p>
        </div>
      </form>
    </article>
  );
};
