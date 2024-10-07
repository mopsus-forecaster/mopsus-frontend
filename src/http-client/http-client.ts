import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { Interceptor, InterceptorRecipe } from './api-client';
import localConfig from '../config';
import { useRefreshToken } from '../hooks/useRefreshToken/useRefreshToken';

export interface Options extends AxiosRequestConfig {
  cancel?: (cancel: Canceler) => void;
  requestInterceptors?: Interceptor[];
  responseInterceptors?: Interceptor[];
  interceptorsRecipe?: InterceptorRecipe;
  api?: string;
  data?: any;
  headers?: any;
  method?: string;
  params?: string;
  cache?: boolean;
  cacheMinutes?: number;
  status?: number;
}

export const BasicResponseTransformInterceptor: Interceptor = [
  (response: AxiosResponse): any => ({
    status: response.status,
    data: response.data,
    errors: [],
  }),
  null,
];

export const BasicInterceptors: InterceptorRecipe = {
  requestInterceptors: [],
  responseInterceptors: [BasicResponseTransformInterceptor],
};

export class FetchError extends Error {
  static CANCEL = 'cancel-request';

  type = null;
  baseError = null;

  constructor(ctx) {
    super(ctx);
    this.type = ctx.type;
    this.baseError = ctx.baseError;
  }
}

export const fetch = async (
  url: string,
  {
    interceptorsRecipe = BasicInterceptors,
    cancel,
    requestInterceptors,
    responseInterceptors,
    headers = {},
    api,
    method,
    params,
    ...otherOptions
  }: Options = {}
): Promise<any> => {
  const { dev } = localConfig;
  const { config } = dev;

  if (api) {
    const apiConfig = config.api[api];

    if (apiConfig) {
      url = apiConfig.basepath + url;
    } else {
      throw new Error(`No existe configuración para la API ${api}`);
    }
  }

  const instance = axios.create();

  (requestInterceptors
    ? requestInterceptors
    : interceptorsRecipe.requestInterceptors
  ).forEach(([resolve, reject]) => {
    instance.interceptors.request.use(resolve, reject);
  });

  (responseInterceptors
    ? responseInterceptors
    : interceptorsRecipe.responseInterceptors
  ).forEach(([resolve, reject]) => {
    instance.interceptors.response.use(resolve, reject);
  });

  const retryRequest = async (prevRequest) => {
    return instance(prevRequest);
  };

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        try {
          const refresh = useRefreshToken();
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return retryRequest(prevRequest);
        } catch (err) {
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  headers = {
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = (await instance.request({
      url,
      headers,
      cancelToken: cancel ? new axios.CancelToken(cancel) : null,
      method,
      params,
      ...otherOptions,
    })) as any;

    return {
      data: response.data,
      status: response.status,
      error: null,
    };
  } catch (err) {
    if (axios.isCancel(err)) {
      throw new FetchError({ type: FetchError.CANCEL, baseError: err });
    } else {
      console.log(err);
      const errors = err.response?.data?.errors
        ? err.response.data.errors.map((error) => ({
            message: error.message,
            status: error.status || err.response?.status,
          }))
        : [
            {
              message:
                err.response?.data?.error || err.message || 'Unknown error',
              status: err.response?.status,
            },
          ];

      const generalStatus = errors.length > 1 ? 500 : errors[0].status;

      const errorResponse = {
        data: null,
        status: generalStatus,
        errors: errors,
      };

      throw errorResponse;
    }
  }
};

const makeMethod =
  (method: string) =>
  (url: string, options: Options = {}) =>
    fetch(url, {
      ...options,
      method,
    });

export const get = makeMethod('get');
export const post = makeMethod('post');
export const put = makeMethod('put');
export const del = makeMethod('delete');
