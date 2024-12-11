import { createContext, useState } from 'react';
import { getUsers } from '../../services/users';

export const INITIAL_FILTERS = {
  page: 1,
};

export const UsersContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [mappedUsers, setMappedUsers] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);

  const getEnterpriseUsers = async (customFilters) => {
    try {
      setIsLoading(true);
      const { users, total_pages, total_count } = await getUsers(
        customFilters || INITIAL_FILTERS
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
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
