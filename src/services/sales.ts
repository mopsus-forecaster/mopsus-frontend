import { apiClient } from '../http-client/api-client';

export const createSale = async (products, discount) => {
  const productData = products.map(({ id, quantity }) => ({
    product_id: id,
    quantity: quantity,
  }));

  console.log('Datos a enviar:', {
    product: productData,
    discount,
  });

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
