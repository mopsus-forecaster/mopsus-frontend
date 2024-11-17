import { apiClient } from '../http-client/api-client';

export const getTotalSalesByCategory = async (wantedFormat = 'appearances') => {
  const respones = await apiClient({
    api: 'metrics',
    service: `categories?wanted_format=${wantedFormat}`,
    verb: 'get',
  });
  return respones.data;
};

export const getTotalSales = async (wantedFormat = 'appearances') => {
  const respones = await apiClient({
    api: 'metrics',
    service: `top-sales?wanted_format=${wantedFormat}`,
    verb: 'get',
  });
  return respones.data;
};
