import { useContext, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import styles from '../styles/auth.module.scss';
import { mopsusIcons } from '../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LoginCommonHeader } from './components/LoginCommonHeader';
import routes from '../../router/routes';
import { useForm } from '../../Hooks';
import { userLogin } from '../services/auth';
import useModal from '../../Hooks/useModal';
import Modal from '../../shared/modal/Modal';

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
  const { openModal, handleClose, handleOpen, modal, handleModalChange } =
  useModal();
  const onLogin = async () => {
    try{
      await userLogin(form.email, form.password).then((response) => {
        if (response.status === 200) {
          login(response.data.username, response.data.accessToken);
          console.log('Usuario logeado');
        }
        if (response.status != 200) {
          console.log('Usuario o contraseña incorrectos');
          
        }

      }
      );
      navigate('/inicio', {
        replace: true,
      });
      
    } catch (error) {
      console.error(error);
      handleModalChange({
        accept: {
          title: "Aceptar",
          action: () => {},
        },
        title: "Error en los campos",
        message: "Asegúrese de que los campos esten completados correctamente.",
        icon: mopsusIcons.error,
      });
      handleOpen();
      return
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
          onClick={() => navigate(`/${routes.register}`)}
        >
          Crear una cuenta
        </p>
      </div>
      <Modal
        title={modal.title}
        icon={modal.icon}
        show={openModal}
        message={modal.message}
        accept={{ title: modal.accept.title, action: modal.accept.action }}
        reject={{ title: modal.reject?.title, action: modal.reject?.action }}
        handleClose={handleClose}
      />
    </article>
    
  );
};
