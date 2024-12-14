import { apiClient } from '../http-client/api-client';

export const createInventory = async (
  description,
  products,
  date_receipt,
  receipt_number
) => {
  const productData = products.map(({ id, quantity, price }) => ({
    id_product: id,
    quantity: quantity,
    price: price,
  }));

  const response = await apiClient({
    api: 'incomes',
    service: '/create',
    verb: 'post',
    dataSend: {
      products: productData,
      date_receipt,
      receipt_number,
      description,
    },
  });
  return response.data;
};

export const getInventory = async ({
  page,
  id_incomes = null,
  start_date = null,
  end_date = null,
  is_adjustment = null,
  is_active = null,
}) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.append('page', page);
  if (id_incomes !== null) queryParams.append('id_incomes', id_incomes);
  if (start_date !== null) queryParams.append('start_date', start_date);
  if (end_date !== null) queryParams.append('end_date', end_date);
  if (is_adjustment !== null)
    queryParams.append('is_adjustment', is_adjustment);
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

export const createAdjustment = async (products, description) => {
  const productData = products.map(({ id, quantity, is_income }) => ({
    id_product: id,
    quantity: quantity,
    is_income: is_income,
  }));

  const response = await apiClient({
    api: 'incomes',
    service: '/create_adjustment',
    verb: 'post',
    dataSend: {
      products: productData,
      description,
    },
  });
  return response.data;
};
