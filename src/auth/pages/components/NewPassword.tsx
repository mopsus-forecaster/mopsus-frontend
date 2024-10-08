import { useState, useContext } from 'react';
import styles from '../../styles/auth.module.scss';
import { LoginCommonHeader } from './LoginCommonHeader';
import { useForm } from '../../../hooks';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { forgottenPassword } from '../../../services';
import { AuthContext } from '../../../contexts';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { MfaFlow } from '../../../types';

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
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    INITIAL_STATE,
    validateForm
  );

  const { newPassword, newPasswordConfirmation } = form;
  const { handleModalChange, handleOpen } = useContext(ModalContext);
  const handleSetNewPassword = async () => {
    try {
      const response = await forgottenPassword(email);
      if (response) {
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
      <form onSubmit={onSubmit} action="">
        <div className={`${styles.inputGroup} ${styles.pointer}`}>
          <input
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
