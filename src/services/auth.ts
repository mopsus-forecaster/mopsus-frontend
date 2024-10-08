import { apiClient } from '../http-client/api-client';

export const userLogin = async (email: string, password: string) => {
  const response = await apiClient({
    api: 'auth',
    service: '/',
    verb: 'post',
    dataSend: {
      email,
      password,
    },
  });
  return response.data;
};

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  console.log({
    email,
    password,
    name,
  });
  const response = await apiClient({
    api: 'auth',
    service: '/register',
    verb: 'post',
    dataSend: {
      email,
      password,
      name,
    },
  });
  return response.data;
};

export const refreshUser = async (refresh_token: string) => {
  const response = await apiClient({
    api: 'auth',
    service: '/refresh_token',
    verb: 'post',
    dataSend: {
      refresh_token,
    },
  });
  return response.data;
};

export const resendCode = async (email: string) => {
  const response = await apiClient({
    api: 'auth',
    service: '/resend_confirmation_code',
    verb: 'post',
    dataSend: {
      email,
    },
  });
  return response;
};
