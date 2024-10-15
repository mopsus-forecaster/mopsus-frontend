import { apiClient } from '../http-client/api-client';

export const addProduct = async (title, price, reposition_point, stock) => {
  console.log('hola');
  const response = await apiClient({
    api: 'products',
    service: '',
    verb: 'post',
    dataSend: {
      title,
      price,
      reposition_point,
      stock,
    },
  });
  return response.data;
};
