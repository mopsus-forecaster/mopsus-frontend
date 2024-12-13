import { createContext, useContext, useState } from 'react';
import {
  disableUserByMail,
  enableUserByMail,
  getUsers,
} from '../../services/users';
import { ModalContext } from '../modal/ModalContext';
import { LoadingContext } from '../loading/LoadingContext';

export const INITIAL_FILTERS = {
  page: 1,
  name: '',
};

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [mappedUsers, setMappedUsers] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const { handleModalChange, handleOpen } = useContext(ModalContext);
  const { setShowLoading } = useContext(LoadingContext);

  const getEnterpriseUsers = async (customFilters?) => {
    try {
      setIsLoading(true);
      console.log(customFilters);
      const { users, total_pages, total_count } = await getUsers(
        customFilters || filters
      );
      if (users) {
        setTotalCount(total_count);
        setTotalPages(total_pages);
        const mapped = users.map(
          ({
            Enabled,
            UserCreateDate,
            UserLastModifiedDate,
            UserStatus,
            email,
            name,
            roles,
          }) => {
            return {
              email,
              name,
              enabled: Enabled,
              userCreationDate: UserCreateDate,
              lastModification: UserLastModifiedDate,
              status: UserStatus,
              roles,
            };
          }
        );
        setMappedUsers(mapped);
      }
    } catch (error) {
      setMappedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    const nextPage =
      filters.page + 1 !== totalPages.current + 1
        ? filters.page + 1
        : totalPages.current;
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getEnterpriseUsers({ ...filters, page: nextPage });
  };

  const goToPreviousPage = () => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getEnterpriseUsers({ ...filters, page: nextPage });
  };

  const goToFirstPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    getEnterpriseUsers({ ...filters, page: 1 });
  };

  const goToLastPage = () => {
    if (totalPages.current !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages.current,
      }));
      getEnterpriseUsers({ ...filters, page: totalPages.current });
    }
  };

  const searchUserByName = (name) => {
    setFilters({ ...filters, name });
    getEnterpriseUsers({ ...filters, name: name || '' });
  };

  const disableUser = async (user) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await disableUserByMail(user.email);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: async () => {
                    getEnterpriseUsers();
                  },
                },

                title: `${user.name} dado de baja`,
                message: 'Podrá consultar su estado desde la tabla de usuarios',
              });
              handleOpen();
            }
          } catch (error) {
            setShowLoading(false);
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: async () => {},
              },

              title: 'Error técnico',
              message: `${user.name} no pudo ser dado de baja. Pruebe en otro momento`,
            });
            handleOpen();
          }
        },
      },
      reject: {
        title: 'Cancelar',
        action: async () => {},
      },
      title: `Dar de baja a ${user.name}`,
      message: '¿Está seguro que desea dar de baja a este usuario?',
    });
    handleOpen();
  };

  const activateUser = (user) => {
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            setShowLoading(true);
            const response = await enableUserByMail(user.email);
            if (response) {
              setShowLoading(false);
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: async () => {
                    getEnterpriseUsers();
                  },
                },

                title: `${user.name} dado de alta`,
                message: 'Podrá consultar su estado desde la tabla de usuarios',
              });
              handleOpen();
            }
          } catch (error) {
            setShowLoading(false);
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: async () => {},
              },

              title: 'Error técnico',
              message: `${user.name} no pudo ser dado de alta. Pruebe en otro momento`,
            });
            handleOpen();
          }
        },
      },
      reject: {
        title: 'Cancelar',
        action: async () => {},
      },
      title: `Dar de alta a ${user.name}`,
      message: '¿Está seguro que desea dar de alta a este usuario?',
    });
    handleOpen();
  };

  return (
    <UsersContext.Provider
      value={{
        getEnterpriseUsers,
        mappedUsers,
        setMappedUsers,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPreviousPage,
        isLoading,
        filters,
        totalCount,
        totalPages,
        disableUser,
        activateUser,
        searchUserByName,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
