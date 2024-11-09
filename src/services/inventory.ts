import { apiClient } from '../http-client/api-client';

export const createInventory = async (description, products) => {
  const productData = products.map(({ id, quantity }) => ({
    id_product: id,
    quantity: quantity,
  }));

  const response = await apiClient({
    api: 'incomes',
    service: '/create',
    verb: 'post',
    dataSend: {
      products: productData,
      description,
    },
  });
  return response.data;
};

export const getInventory = async ({
  page,
  start_date = null,
  end_date = null,
  include_adjustments = null,
  is_active = null,
}) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append('page', page);
  if (start_date !== null) queryParams.append('start_date', start_date);
  if (end_date !== null) queryParams.append('end_date', end_date);
  if (include_adjustments !== null)
    queryParams.append('include_adjustments', include_adjustments);
  if (is_active !== null) queryParams.append('is_active', is_active);
  const response = await apiClient({
    api: 'incomes',
    service: `?${queryParams.toString()}`,
    verb: 'get',
  });
  return response.data;
};

export const getInventoryById = async (id) => {
  const respones = await apiClient({
    api: 'incomes',
    service: `/${id}`,
    verb: 'get',
    dataSend: {
      id,
    },
  });
  return respones.data;
};

export const deleteIncome = async (id) => {
  const response = await apiClient({
    api: 'incomes',
    service: '/delete_product_incomes',
    verb: 'put',
    dataSend: {
      id,
    },
  });
  return response.data;
};
