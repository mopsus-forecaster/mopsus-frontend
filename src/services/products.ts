import { apiClient } from '../http-client/api-client';

export const addProduct = async (
  title,
  priceNoCasted,
  repositionPointNoCasted,
  stockNoCasted,
  unitNoCasted,
  categoryNoCasted
) => {
  const price = Number(priceNoCasted);
  const reposition_point = Number(repositionPointNoCasted);
  const stock = Number(stockNoCasted);
  const unidad_id = Number(unitNoCasted);
  const category_id = Number(categoryNoCasted);

  const response = await apiClient({
    api: 'products',
    service: '',
    verb: 'post',
    dataSend: {
      title,
      price,
      reposition_point,
      stock,
      category_id,
      unidad_id,
    },
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient({
    api: 'products',
    service: '/categories',
    verb: 'get',
  });
  return response.data;
};

export const getUnits = async () => {
  const response = await apiClient({
    api: 'products',
    service: '/units',
    verb: 'get',
  });
  return response.data;
};

export const getAllProducts = async (page) => {
  const response = await apiClient({
    api: 'products',
    service: `/?page=${page}`,
    verb: 'get',
  });
  return response.data;
};
