import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Interceptor, InterceptorRecipe } from './api-client';
import config from '../config';

export interface Options extends AxiosRequestConfig {
  requestInterceptors?: Interceptor[];
  responseInterceptors?: Interceptor[];
  interceptorsRecipe?: InterceptorRecipe;
  api?: string;
  data?: any;
  headers?: any;
  method?: string;
  params?: string;
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

function fulfillInterceptors(interceptors, instance) {
  interceptors.forEach(([resolve, reject]) => {
    instance.interceptors.request.use(resolve, reject);
  });
}

export const makeHttpCall = async (
  url: string,
  {
    interceptorsRecipe = BasicInterceptors,
    requestInterceptors,
    responseInterceptors,
    headers = {},
    api,
    method,
    params,
    ...otherOptions
  }: Options = {}
): Promise<any> => {
  if (api) {
    const apiConfig = config.api[api];
    if (apiConfig) {
      url = apiConfig.basepath + url;
    } else {
      throw new Error(`No existe configuración para la API ${api}`);
    }
  }

  const instance = axios.create();

  fulfillInterceptors(
    requestInterceptors
      ? requestInterceptors
      : interceptorsRecipe.requestInterceptors,
    instance
  );

  fulfillInterceptors(
    responseInterceptors
      ? responseInterceptors
      : interceptorsRecipe.responseInterceptors,
    instance
  );

  headers = {
    'Content-Type': 'application/json',
    ...headers,
  };
  try {
    const response = (await instance.request({
      url,
      headers,
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
    const errors = err.response?.data?.errors
      ? err.response.data.errors.map((error) => ({
          message: error.message,
          status: error.status || err.response?.status,
          data: err.response.data,
        }))
      : [
          {
            message:
              err.response?.data?.error || err.message || 'Unknown error',
            status: err.response?.status,
            data: err.response.data,
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
};

export const callHttpClient = (url: string, options: Options = {}, method) => {
  return makeHttpCall(url, {
    ...options,
    method,
  });
};
