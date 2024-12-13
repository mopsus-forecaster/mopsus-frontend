import styles from '../styles/users.module.scss';

export const MapUsersTable = (
  user,
  handleSetOpenEditRole,
  disableUser,
  activateUser
) => {
  let chipInfo;

  switch (user.status) {
    case 'CONFIRMED':
      chipInfo = {
        label: 'Confirmado',
        color: 'success',
      };
      break;

    case 'UNCONFIRMED':
      chipInfo = {
        label: 'Sin confirmar',
        color: 'warning',
      };
      break;

    case 'FORCE_CHANGE_PASSWORD':
      chipInfo = {
        label: 'Necesita activación',
        color: 'warning',
      };
      break;

    default:
      chipInfo = null;
      break;
  }

  const enableSwitcher = {
    label: user.enabled ? 'Dar de baja' : 'Dar de alta',
    function: () => {
      if (user.enabled) {
        disableUser(user);
        return;
      }

      activateUser(user);
    },
  };

  const actions = [
    {
      label: 'Editar rol',
      function: () => {
        handleSetOpenEditRole({ state: true, user });
      },
    },
    enableSwitcher,
  ];

  const status = chipInfo ? (
    <div
      className={
        chipInfo.color === 'success' ? styles.successChip : styles.warningChip
      }
    >
      <p className={styles.chipText}>{chipInfo.label}</p>
    </div>
  ) : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    email: user.email,
    name: user.name,
    enabled: user.enabled ? 'Habilitado' : 'Deshabilitado',
    userCreationDate: formatDate(user.userCreationDate),
    lastModification: formatDate(user.lastModification),
    status: status,
    actions,
  };
};
