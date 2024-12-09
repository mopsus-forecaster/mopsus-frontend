import { callHttpClient } from './http-client';
import { AuthenticationInterceptor } from './interceptors';

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

const interceptors: InterceptorRecipe = {
  requestInterceptors: [AuthenticationInterceptor],
  responseInterceptors: [],
};

export const apiClient = async (param: IAPIClientParam) => {
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
  const { api, service = '', dataSend, verb, headers } = param;

  const { data, errors, status } = await callHttpClient(
    service,
    {
      api: api,
      data: dataSend || {},
      interceptorsRecipe: myInterceptors,
      headers,
    },
    verb
  );

  return { data, errors, status };
};
