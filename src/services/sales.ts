import { apiClient } from '../http-client/api-client';
import { camelToSnake } from '../utils/parseCamelToSnakeCase';

export const createSale = async (products, discount) => {
  const productData = products.map(({ id, quantity }) => ({
    product_id: id,
    quantity: quantity,
  }));

  const response = await apiClient({
    api: 'sales',
    service: '/create',
    verb: 'post',
    dataSend: {
      products: productData,
      discount,
    },
  });

  return response.data;
};

export const getSale = async (filters) => {
  const dataSend = Object.keys(filters).reduce((acc, key) => {
    const value = filters[key];

    if (value !== null && value !== undefined && value !== '') {
      const snakeCaseKey = camelToSnake(key);
      acc[snakeCaseKey] = value;
    }
    return acc;
  }, {});

  const response = await apiClient({
    api: 'sales',
    service: '',
    verb: 'post',
    dataSend: dataSend,
  });

  return response.data;
};
