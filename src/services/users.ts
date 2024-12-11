import { apiClient } from '../http-client/api-client';

export const getUsers = async ({ page }) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);
  const response = await apiClient({
    api: 'auth',
    service: `/get_users_entidad?${queryParams.toString()}`,
    verb: 'get',
  });
  return response.data;
};

export const createUserByAdmin = async (user) => {
  const data = user;
  const response = await apiClient({
    api: 'auth',
    service: `/register_user_admin`,
    verb: 'post',
    dataSend: data,
  });
  return response.data;
};

export const changeUserRole = async (user) => {
  const data = user;
  const response = await apiClient({
    api: 'auth',
    service: `/change_role`,
    verb: 'put',
    dataSend: data,
  });
  return response.data;
};
