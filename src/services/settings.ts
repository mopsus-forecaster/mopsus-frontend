import { apiClient } from '../http-client/api-client';

export const getCategories = async ({ page, name = '', is_active = null }) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);

  if (name) queryParams.append('name', name);
  if (is_active) queryParams.append('is_active', is_active);

  const response = await apiClient({
    api: 'products',
    service: `/get_categories_filter?${queryParams.toString()}`,
    verb: 'get',
  });
  return response.data;
};

export const getBrands = async ({ page, name = '', is_active = null }) => {
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);

  if (name !== null) queryParams.append('name', name);
  if (is_active !== null) queryParams.append('is_active', is_active);

  const response = await apiClient({
    api: 'products',
    service: `/get_brands?${queryParams.toString()}`,
    verb: 'get',
  });
  return response.data;
};

export const addCategory = async (name, description) => {
  const response = await apiClient({
    api: 'products',
    service: '/create_category',
    verb: 'post',
    dataSend: {
      name,
      description,
    },
  });
  return response.data;
};

export const addBrand = async (name, description) => {
  const response = await apiClient({
    api: 'products',
    service: '/create_brand',
    verb: 'post',
    dataSend: {
      name,
      description,
    },
  });
  return response.data;
};

export const deleteBrand = async (id) => {
  const respones = await apiClient({
    api: 'products',
    service: `/delete_brand?${id}`,
    verb: 'put',
    dataSend: {
      id,
    },
  });

  return respones.data;
};

export const deleteCategory = async (id) => {
  const respones = await apiClient({
    api: 'products',
    service: `/delete_category?${id}`,
    verb: 'put',
    dataSend: {
      id,
    },
  });

  return respones.data;
};

export const onEditCat = async (id, name, description) => {
  const response = await apiClient({
    api: 'products',
    service: `/update_category`,
    verb: 'put',
    dataSend: {
      id,
      name,
      description,
    },
  });

  return response.data;
};

export const onEditBrand = async (id, name, description) => {
  const response = await apiClient({
    api: 'products',
    service: `/update_brand`,
    verb: 'put',
    dataSend: {
      id,
      name,
      description,
    },
  });

  return response.data;
};
