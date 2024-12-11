import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../styles/users.module.scss';
import { RoleSelector } from './RoleSelector';
import { useContext, useState } from 'react';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import { changeUserRole } from '../../../services/users';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { UsersContext } from '../../../contexts/users/UsersContext';

export const EditUserRole = ({ onClose, user }) => {
  const { setShowLoading } = useContext(LoadingContext);
  const [selectedRoles, setSelectedRoles] = useState(user.roles);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const { getEnterpriseUsers } = useContext(UsersContext);
  const validateForm = () => {
    const errors = {};

    if (selectedRoles.length === 0) {
      errors['roles'] = 'El rol es requerido';
    }

    return errors;
  };

  const [errors, setErrors] = useState(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      handleModalChange({
        accept: {
          title: 'Aceptar',
          action: async () => {
            try {
              setShowLoading(true);
              const userToEdit = {
                email: user.email,
                roles: selectedRoles,
              };
              const response = await changeUserRole(userToEdit);
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
                  title: 'Rol de usuario modificado con éxito',
                  message: 'Podrá verlo en la tabla de usuarios',
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
                    title: 'Error al cambiar el rol del usuario',
                    message: 'Los datos enviados son incorrectos ',
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
          },
        },
        reject: {
          title: 'Cancelar',
          action: () => {},
        },
        title: 'Confirmar edición de rol',
        message: `¿Está seguro de que desea cambiar el rol de ${user.name}?`,
      });
      handleOpen();
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
          <h2 className={styles.titleRegister}>Editar rol de {user.name} </h2>
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
              <label htmlFor="role" className={styles.modalLabel}>
                Rol (se puede seleccionar más de uno)
              </label>
              {errors?.roles && <p className={styles.error}>{errors?.roles}</p>}
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
              Cambiar Rol
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
