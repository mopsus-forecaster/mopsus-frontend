import styles from '../styles/users.module.scss';

const roles = {
  admin: 'admin',
  sales: 'operador_ventas',
  stock: 'operador_ingresos',
  reports: 'operador_reportes',
};

export const RoleSelector = ({ selectedRoles, handleRoleSelection }) => {
  const isRolePresent = (role) => {
    return selectedRoles.find((currentRole) => role === currentRole);
  };

  return (
    <section className={styles.rolesContainer}>
      <div
        className={
          isRolePresent(roles.admin) ? styles.activeRole : styles.roleContainer
        }
        onClick={() => handleRoleSelection(roles.admin)}
      >
        <h3
          className={
            isRolePresent(roles.admin) ? styles.activeTitle : styles.roleTile
          }
        >
          Administrador del sistema
        </h3>
        <p
          className={
            isRolePresent(roles.admin)
              ? styles.activeDescription
              : styles.roleDescription
          }
        >
          Acceso a todas las funcionalidades
        </p>
      </div>

      <div
        className={
          isRolePresent(roles.sales) ? styles.activeRole : styles.roleContainer
        }
        onClick={() => handleRoleSelection(roles.sales)}
      >
        <h3
          className={
            isRolePresent(roles.sales) ? styles.activeTitle : styles.roleTile
          }
        >
          Operador de ventas
        </h3>
        <p
          className={
            isRolePresent(roles.sales)
              ? styles.activeDescription
              : styles.roleDescription
          }
        >
          Acceso a productos, ventas y opciones
        </p>
      </div>

      <div
        className={
          isRolePresent(roles.stock) ? styles.activeRole : styles.roleContainer
        }
        onClick={() => handleRoleSelection(roles.stock)}
      >
        <h3
          className={
            isRolePresent(roles.stock) ? styles.activeTitle : styles.roleTile
          }
        >
          Operador de ingresos
        </h3>
        <p
          className={
            isRolePresent(roles.stock)
              ? styles.activeDescription
              : styles.roleDescription
          }
        >
          Acceso a stock,productos y opciones
        </p>
      </div>

      <div
        className={
          isRolePresent(roles.reports)
            ? styles.activeRole
            : styles.roleContainer
        }
        onClick={() => handleRoleSelection(roles.reports)}
      >
        <h3
          className={
            isRolePresent(roles.reports) ? styles.activeTitle : styles.roleTile
          }
        >
          Operador de reportes
        </h3>
        <p
          className={
            isRolePresent(roles.reports)
              ? styles.activeDescription
              : styles.roleDescription
          }
        >
          Acceso únicamente a los reportes
        </p>
      </div>
    </section>
  );
};
