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

export const forgottenPassword = async (email: string) => {
  const response = await apiClient({
    api: 'auth',
    service: '/forgot_password',
    verb: 'post',
    dataSend: {
      email,
    },
  });
  return response;
};
export const validateCode = async (email, confirmation_code: string) => {
  const response = await apiClient({
    api: 'auth',
    service: '/confirm_signup',
    verb: 'post',
    dataSend: {
      email,
      confirmation_code,
    },
  });
  return response;
};

export const blockedUserVerificationCode = async (
  email,
  new_password: string,
  confirmation_code: string
) => {
  const response = await apiClient({
    api: 'auth',
    service: '/forgot_password_confirmation',
    verb: 'post',
    dataSend: {
      email,
      new_password,
      confirmation_code,
    },
  });
  return response;
};
