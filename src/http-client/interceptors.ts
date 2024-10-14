import { Interceptor } from './api-client';
import Cookies from 'js-cookie';

export const AuthenticationInterceptor: Interceptor = [
  async (reqConf) => {
    if (!reqConf?.headers['Authorization']) {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        reqConf.headers['Authorization'] = `${accessToken}`;
      }
    }
    return reqConf;
  },
  null,
];
