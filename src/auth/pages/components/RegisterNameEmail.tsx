import { useContext } from 'react';
import { useForm } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { LoginCommonHeader } from './LoginCommonHeader';
import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import routes from '../../../router/routes';
import styles from '../../styles/auth.module.scss';
import { AuthContext } from '../../../contexts';

interface FormData {
  name: string;
  email: string;
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

  if (!form.name) {
    errors.name = 'El nombre es requerido';
  } else if (form.name.length > 16) {
    errors.name = 'El nombre no debe tener mas de 16 caracteres';
  }

  return errors;
};
export const RegisterNameEmail = () => {
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      name: '',
      email: '',
    },
    validateForm
  );
  const { handleSetRegisterData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = async () => {
    handleSetRegisterData(form.email, form.name);
    navigate(`/${routes.registerPassword}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(handleNavigation);
  };

  return (
    <article className={styles.mfaContainer}>
      <LoginCommonHeader title="Registrar Usuario" />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
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

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder=" "
          />
          <label className={styles.labelline}>Nombre de la empresa</label>
          <Icon icon={mopsusIcons.user} className={styles.icon} />
        </div>
        {errors.name && <p className={styles.errors}>{errors.name}</p>}

        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Siguiente paso
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.login}`)}>¿Ya tienes cuenta?</p>
        </div>
      </form>
    </article>
  );
};
