import { useState, useContext } from 'react';
import styles from '../../styles/auth.module.scss';
import { LoginCommonHeader } from './LoginCommonHeader';
import { useForm } from '../../../hooks';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import {
  firstAccessPasswordChange,
  forgottenPassword,
} from '../../../services';
import { AuthContext } from '../../../contexts';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { MfaFlow } from '../../../types';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';

interface FormData {
  newPassword: string;
  newPasswordConfirmation: string;
}
const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};

  if (!form.newPassword) {
    errors.newPassword = 'La contraseña es requerida';
  } else if (form.newPassword.length < 8 || form.newPassword.length > 32) {
    errors.newPassword = 'La contraseña debe tener entre 8 y 32 caracteres';
  }

  if (!form.newPasswordConfirmation) {
    errors.newPasswordConfirmation =
      'La confirmación de la contraseña es requerida';
  } else if (form.newPassword !== form.newPasswordConfirmation) {
    errors.newPasswordConfirmation = 'La contraseña deben coincidir';
  }

  return errors;
};

const INITIAL_STATE = {
  newPassword: '',
  newPasswordConfirmation: '',
};

export const NewPassword = () => {
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showNewPwdConfirmation, setShowNewPwdConfirmation] = useState(false);
  const {
    recoverEmail: email,
    setRecoverPassword,
    handlesetPrevRoute,
    currentMfaFlow,
    session,
    recoverEmail,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setShowLoading } = useContext(LoadingContext);

  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    INITIAL_STATE,
    validateForm
  );

  const { newPassword, newPasswordConfirmation } = form;
  const { handleModalChange, handleOpen } = useContext(ModalContext);

  const handleFirstAccessPasswordChange = async () => {
    try {
      setShowLoading(true);

      const response = await firstAccessPasswordChange(
        recoverEmail,
        form.newPassword,
        session
      );
      if (response) {
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              navigate(`/${routes.login}`);
            },
          },
          title: 'Contraseña actualizada correctamente',
          message: 'Ya puede dirigirse al login para comenzar a usar Mopsus.',
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

  const handleSetNewPassword = async () => {
    if (session) {
      handleFirstAccessPasswordChange();
      return;
    }
    try {
      setShowLoading(true);
      const response = await forgottenPassword(email);
      if (response) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              if (currentMfaFlow === MfaFlow.AccountRecovery) {
                handlesetPrevRoute(MfaFlow.AccountRecovery);
              } else {
                handlesetPrevRoute(MfaFlow.BlockedAccountRecovery);
              }
              setRecoverPassword(form.newPassword);
              navigate(`/${routes.mfaAuthenticator}`);
            },
          },
          title: 'Codigo enviado',
          message:
            'Hemos enviado un codigo a su correo para restaurar su clave',
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

  const onSubmit = (e) => {
    e.preventDefault();

    handleSubmit(handleSetNewPassword);
  };

  return (
    <article className={styles.mfaContainer}>
      <div>
        <LoginCommonHeader title="Cambiar contraseña" />
        <p className={styles.accountRecoveryText}>
          Ingrese su nueva contraseña
        </p>
      </div>
      <form className={styles.form} onSubmit={onSubmit} action="">
        <div className={`${styles.inputGroup} ${styles.pointer}`}>
          <input
            className={styles.input}
            type={showNewPwd ? 'text' : 'password'}
            name="newPassword"
            onChange={handleChange}
            value={newPassword}
            placeholder=" "
          />
          <label className={styles.labelline}>Contraseña</label>
          <div onClick={() => setShowNewPwd(!showNewPwd)}>
            <Icon
              icon={showNewPwd ? mopsusIcons.lockOpen : mopsusIcons.lockClose}
              className={styles.icon}
            />
          </div>
        </div>
        {errors.newPassword && (
          <p className={styles.errors}>{errors.newPassword} </p>
        )}{' '}
        <div className={`${styles.inputGroup} ${styles.pointer}`}>
          <input
            className={styles.input}
            type={showNewPwdConfirmation ? 'text' : 'password'}
            name="newPasswordConfirmation"
            onChange={handleChange}
            value={newPasswordConfirmation}
            placeholder=" "
          />
          <label className={styles.labelline}>Confirmar contraseña</label>
          <div
            onClick={() => setShowNewPwdConfirmation(!showNewPwdConfirmation)}
          >
            <Icon
              icon={
                showNewPwdConfirmation
                  ? mopsusIcons.lockOpen
                  : mopsusIcons.lockClose
              }
              className={styles.icon}
            />
          </div>
        </div>
        {errors.newPasswordConfirmation && (
          <p className={styles.errors}>{errors.newPasswordConfirmation} </p>
        )}
        <div className={styles.inputGroup}>
          <button type="submit" className={styles.btn}>
            Actualizar contraseña
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.login}`)}>Volver al login</p>
        </div>
      </form>
    </article>
  );
};
