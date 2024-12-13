import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/users.module.scss';
import { mopsusIcons } from '../../../icons';

export const UserInfo = ({ user, onClose }) => {
  const formattedRoles = {
    operador_ventas: 'Operador de ventas',
    operador_reportes: 'Operador de reportes',
    operador_ingresos: 'Operador de ingresos',
    admin: 'Administrador',
  };

  const parseUserRole = (roles) => {
    const snakeCaseParsing = roles?.map((role) => {
      return formattedRoles[role];
    });
    return snakeCaseParsing?.join(' - ');
  };

  let status;
  switch (user.status) {
    case 'CONFIRMED':
      status = 'Confirmado';

      break;

    case 'UNCONFIRMED':
      status = 'Sin confirmar';

      break;

    case 'FORCE_CHANGE_PASSWORD':
      status = 'Necesita activación';

      break;

    default:
      status = null;
      break;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.informationContainer}>
        <div className={styles.registerHeading}>
          <h2 className={styles.informationTitle}>
            Información de {user.name}
          </h2>
          <Icon
            fontSize={25}
            icon={mopsusIcons.closeModal}
            className={styles.iconClose}
            onClick={onClose}
          />
        </div>

        <hr className={styles.line} />
        <section className={styles.informationSection}>
          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Nombre y apellido</label>
            <p className={styles.informationParagraph}>{user.name}</p>
          </div>
          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Correo</label>
            <p className={styles.informationParagraph}>{user.email}</p>
          </div>
          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Roles</label>
            <p className={styles.informationParagraph}>
              {parseUserRole(user.roles)}
            </p>
          </div>
          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Fecha de creación</label>
            <p className={styles.informationParagraph}>
              {formatDate(user.userCreationDate)}
            </p>
          </div>
          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>
              Ultima modificación
            </label>
            <p className={styles.informationParagraph}>
              {formatDate(user.lastModification)}
            </p>
          </div>

          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Estado</label>
            <p className={styles.informationParagraph}>{status}</p>
          </div>

          <div className={styles.informationGroup}>
            <label className={styles.informationLabel}>Habilitado</label>
            <p className={styles.informationParagraph}>
              {user.enabled ? 'Si' : 'No'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
