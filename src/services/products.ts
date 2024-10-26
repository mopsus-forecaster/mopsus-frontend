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

export const deleteProduct = async (id) => {
  const response = await apiClient({
    api: 'products',
    service: '/delete_product',
    verb: 'put',
    dataSend: {
      id,
    },
  });
  return response.data;
};

export const getAllProducts = async ({
  page,
  title = '',
  category_id = null,
  unit_id = null,
  below_reposition = null,
  price_min = null,
  price_max = null,
  is_active = null,
}) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);

  if (title) queryParams.append('title', title);
  if (category_id !== null) queryParams.append('category_id', category_id);
  if (unit_id !== null) queryParams.append('unit_id', unit_id);
  if (below_reposition !== null)
    queryParams.append('below_reposition', below_reposition);
  if (price_min !== null) queryParams.append('price_min', price_min);
  if (price_max !== null) queryParams.append('price_max', price_max);
  if (is_active !== null) queryParams.append('is_active', is_active);
  const response = await apiClient({
    api: 'products',
    service: `/?${queryParams.toString()}`,
    verb: 'get',
  });

  return response.data;
};

export const onEditProduct = async (
  id,
  title,
  id_categoria,
  id_units,
  reposition_point,
  price
) => {
  const priceCasted = Number(price);
  const product = {
    id,
    title,
    id_categoria,
    id_units,
    reposition_point,
    price: priceCasted,
  };
  const response = await apiClient({
    api: 'products',
    service: `/modify_product`,
    verb: 'post',
    dataSend: {
      product,
    },
  });

  return response.data;
};

export const getProductsAllAll = async () => {
  const response = await apiClient({
    api: 'products',
    service: '/get-all/',
    verb: 'get',
  });

  return response.data;
};
