import { useContext, useEffect, useState } from 'react';
import Box from '../../../shared/box';
import styles from '../styles/users.module.scss';
import { UsersContext } from '../../../contexts/users/UsersContext';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { usersTableColumns } from '../data/usersTableColumns';
import { MapUsersTable } from '../utils/users-tabble-mapper';
import { AddUser } from '../components/AddUser';
import { EditUserRole } from '../components/EditRole';
import { UserInfo } from '../components/UserInfo.';

export const Users = () => {
  const [search, setSearch] = useState('');
  const {
    getEnterpriseUsers,
    mappedUsers,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    setMappedUsers,
    filters,
    totalCount,
    totalPages,
    disableUser,
    activateUser,
    searchUserByName,
  } = useContext(UsersContext);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState({
    state: false,
    user: {},
  });
  const [editUserRoleOpen, setEditUserRoleOpen] = useState({
    state: false,
    user: {},
  });

  useEffect(() => {
    getEnterpriseUsers();
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    searchUserByName(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Usuarios</h1>
      </header>

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className={styles.tableSearchInput}
            placeholder="Buscar por nombre"
            type="text"
          />
        </div>
        <button
          className={styles.buttonAdd}
          onClick={() => {
            setAddUserOpen(true);
          }}
        >
          Agregar usuario
        </button>
      </section>

      <MopsusTable
        columns={usersTableColumns}
        rows={mappedUsers.map((user) =>
          MapUsersTable(
            user,
            setEditUserRoleOpen,
            disableUser,
            activateUser,
            setUserInfoOpen
          )
        )}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        includeOptions={false}
        includePagination={true}
        isLoading={isLoading}
        page={filters.page}
        setRows={setMappedUsers}
        totalPages={totalPages}
        totalElements={totalCount}
        actions={true}
      />

      {addUserOpen && (
        <AddUser onClose={() => setAddUserOpen(false)} open={addUserOpen} />
      )}

      {userInfoOpen.state && (
        <UserInfo
          onClose={() => setUserInfoOpen({ state: false, user: {} })}
          user={userInfoOpen.user}
        />
      )}

      {editUserRoleOpen.state && (
        <EditUserRole
          onClose={() => setEditUserRoleOpen({ state: false, user: {} })}
          user={editUserRoleOpen.user}
        />
      )}
    </Box>
  );
};
