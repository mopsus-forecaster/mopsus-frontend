import { apiClient } from '../http-client/api-client';

export const getUsers = async ({ page, name }) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);
  if (name) queryParams.append('name', name);
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

export const disableUserByMail = async (email) => {
  const response = await apiClient({
    api: 'auth',
    service: `/disable_user`,
    verb: 'post',
    dataSend: { email },
  });
  return response.data;
};

export const enableUserByMail = async (email) => {
  const response = await apiClient({
    api: 'auth',
    service: `/enable_user`,
    verb: 'post',
    dataSend: { email },
  });
  return response.data;
};
