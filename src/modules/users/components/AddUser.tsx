import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '../../../hooks';
import { mopsusIcons } from '../../../icons';
import styles from '../styles/users.module.scss';
import { RoleSelector } from './RoleSelector';
import { useContext, useState } from 'react';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import { createUserByAdmin } from '../../../services/users';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { UsersContext } from '../../../contexts/users/UsersContext';

interface FormData {
  name: string;
  email: string;
  roles?: string[] | string;
}

interface AddUserProps {
  onClose: () => void;
  open: boolean;
}

export const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const { setShowLoading } = useContext(LoadingContext);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const { getEnterpriseUsers } = useContext(UsersContext);
  const validateForm = (form: FormData) => {
    const errors: Partial<FormData> = {};

    if (!form.name) {
      errors.name = 'El nombre es requerido';
    }

    if (!form.email) {
      errors.email = 'El correo es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = 'El correo no tiene un formato válido';
      }
    }

    if (selectedRoles.length === 0) {
      errors.roles = 'El rol es requerido';
    }

    return errors;
  };

  const { form, errors, handleChange, setErrors } = useForm<FormData>(
    {
      name: '',
      email: '',
    },
    validateForm
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(form);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setShowLoading(true);
        const user = {
          name: form.name,
          email: form.email,
          roles: selectedRoles,
        };
        const response = await createUserByAdmin(user);
        if (response) {
          setShowLoading(false);
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {
                onClose();
                getEnterpriseUsers();
              },
            },
            title: 'Usuario registrado con éxito',
            message: 'Podrá ver el usuario registrado en la tabla de usuarios',
          });
          handleOpen();
        }
      } catch (error) {
        setShowLoading(false);
        switch (error.generalStatus) {
          case 400:
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: () => {
                  onClose();
                  getEnterpriseUsers();
                },
              },
              title: 'Error al crear usuario',
              message:
                'Los datos enviados son incorrectos o dicho usuario ya existe',
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
                'En este momento no pudimos procesar su solicitud. Intente más tarde',
              icon: mopsusIcons.error,
            });
            handleOpen();
            break;
        }
      }
    }
  };

  const handleRoleSelection = (role) => {
    const searchedRole = selectedRoles.find(
      (currentRole) => currentRole === role
    );

    if (searchedRole) {
      const filteredRoles = selectedRoles.filter(
        (currentRole) => currentRole !== role
      );

      setSelectedRoles([...filteredRoles]);
      return;
    }

    setSelectedRoles((prevRoles) => [...prevRoles, role]);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.registerContainer}>
        <div className={styles.registerHeading}>
          <h2 className={styles.titleRegister}>Registrar Usuario</h2>
          <Icon
            fontSize={25}
            icon={mopsusIcons.closeModal}
            className={styles.iconClose}
            onClick={onClose}
          />
        </div>

        <hr className={styles.line} />
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formFieldsContainer}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.modalLabel}>
                Nombre y apellido del usuario
              </label>
              <input
                type="text"
                name="name"
                className={styles.modalInput}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.modalLabel}>
                Correo
              </label>
              <input
                type="text"
                name="email"
                className={styles.modalInput}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="role" className={styles.modalLabel}>
                Rol (se puede seleccionar más de uno)
              </label>
              {errors.roles && <p className={styles.error}>{errors.roles}</p>}
              <RoleSelector
                selectedRoles={selectedRoles}
                handleRoleSelection={handleRoleSelection}
              />
            </div>
          </div>

          <div className={styles.btnBox}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnRegister}`}
            >
              Registrar Usuario
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
