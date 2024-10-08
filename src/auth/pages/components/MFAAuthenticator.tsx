import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from '../../styles/auth.module.scss';
import { LoginCommonHeader } from './LoginCommonHeader';
import { MFAAuthenticatorProps, MfaFlow } from '../../../types';
import { useNavigate } from 'react-router-dom';
import routes from '../../../router/routes';
import { resendCode } from '../../../services';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { mopsusIcons } from '../../../icons';

const HARCODED_CODE = 180602;

export const MFAAuthenticator: React.FC<MFAAuthenticatorProps> = ({
  email,
  prevRoute,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState('');
  const censorEmail = (): string => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 3) {
      return `${localPart[0]}***@${domain}`;
    }
    const visiblePart = localPart.slice(0, 3);
    return `${visiblePart}*******@${domain}`;
  };

  useEffect(() => {
    if (!email) {
      navigate(`/${routes.login}`);
    }
  }, []);

  const { handleOpen, handleModalChange } = useContext(ModalContext);

  const onResendCode = async () => {
    try {
      const response = await resendCode(email);
      if (response) {
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {},
          },
          title: 'Código reenviado',
          message: 'Revise su correo electrónico',
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (!finalOtp) {
      setErrors('Debe introducir un código');
    } else {
      if (Number(finalOtp) !== HARCODED_CODE) {
        setErrors('El código introducido es incorrecto');
      } else {
        switch (prevRoute) {
          case MfaFlow.RegisterPage:
            navigate(`/login`);
            break;
          case MfaFlow.AccountRecovery:
            navigate(`/${routes.changePassword}`);
            break;
          case MfaFlow.BlockedAccountRecovery:
            navigate(`/${routes.changePassword}`);
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <article className={styles.mfaContainer}>
      <LoginCommonHeader title="Verificar código" />
      <p className={styles.accountRecoveryText}>
        Hemos enviado un código de autenticación a {censorEmail()}
      </p>

      <form>
        <div className={styles.otpContainer}>
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              className={errors ? styles.otpInputError : styles.otpInput}
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>
        {errors && <p className={styles.errors}>{errors}</p>}

        <div className={styles.inputGroup}>
          <button onClick={handleSubmit} className={styles.btn}>
            Verificar código
          </button>
        </div>
        <div className={styles.aBlock}>
          <p onClick={() => navigate(`/${routes.accountRecovery}`)}>
            Puse el correo incorrecto
          </p>
          <p onClick={() => onResendCode}>Enviar código de nuevo</p>
          <p onClick={() => navigate(`/${routes.login}`)}>Volver al login</p>
        </div>
      </form>
    </article>
  );
};
