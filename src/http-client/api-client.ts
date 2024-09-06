import { del, get, post, put } from './http-client';

interface IAPIClientParam {
  api: string;
  service?: string;
  dataSend?: any;
  verb?: string;
  credentials?: boolean;
  headers?: OutsiderHeaders;
  interceptorsRecipe?: InterceptorRecipe;
}

export type OutsiderHeaders = {
  [key: string]: string;
};

export declare type Interceptor = [
  (value: any) => any | Promise<any>,
  (error: any) => any,
];
export declare type InterceptorRecipe = {
  requestInterceptors: Interceptor[];
  responseInterceptors: Interceptor[];
};

const methodMap = {
  get,
  post,
  put,
  del,
};

const apiClientCore = async (
  param: IAPIClientParam,
  _interceptors?: InterceptorRecipe
) => {
  const { api, service = '', dataSend, verb, headers } = param;

  if (!methodMap[verb]) {
    throw new Error(`Método HTTP '${verb}' no soportado.`);
  }

  const { data, errors, status } = await methodMap[verb](service, {
    api: api,
    data: dataSend || {},
    interceptorsRecipe: _interceptors,
    headers,
  });

  return { data, errors, status };
};

const interceptors: InterceptorRecipe = {
  requestInterceptors: [],
  responseInterceptors: [],
};

export const apiClient = (param: IAPIClientParam) => {
  let myInterceptors = interceptors;

  if (param.interceptorsRecipe) {
    myInterceptors = {
      requestInterceptors: [
        ...myInterceptors.requestInterceptors,
        ...param.interceptorsRecipe.requestInterceptors,
      ],
      responseInterceptors: [
        ...param.interceptorsRecipe.responseInterceptors,
        ...myInterceptors.responseInterceptors,
      ],
    };
  }
  return apiClientCore(param, myInterceptors);
};
