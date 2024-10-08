import { Interceptor } from './api-client';

export const AuthenticationInterceptor: Interceptor = [
  async (reqConf) => {
    if (!reqConf?.headers['Authorization']) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        reqConf.headers['Authorization'] = `Bearer ${user?.accessToken}`;
      }
    }
    return reqConf;
  },
  null,
];
