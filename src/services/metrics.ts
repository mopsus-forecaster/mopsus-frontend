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

export const salesForecast = async (
  start_date,
  end_date,
  wantedFormat = 'appearances'
) => {
  const queryParams = new URLSearchParams();
  if (start_date) queryParams.append('start_date', start_date);
  if (end_date) queryParams.append('end_date', end_date);
  queryParams.append('wanted_format', wantedFormat);

  const respones = await apiClient({
    api: 'metrics',
    service: `forecast?${queryParams.toString()}`,
    verb: 'get',
  });
  return respones.data;
};

export const salesAndIncmesForecastByHour = async (
  date,
  wantedFormat = 'appearances'
) => {
  const queryParams = new URLSearchParams();
  if (date) queryParams.append('date', date);
  queryParams.append('wanted_format', wantedFormat);

  const respones = await apiClient({
    api: 'metrics',
    service: `forecast_by_hour?${queryParams.toString()}`,
    verb: 'get',
  });
  return respones.data;
};

export const forecastByProduct = async (date, wantedFormat = 'appearances') => {
  const queryParams = new URLSearchParams();
  if (date) queryParams.append('date', date);
  queryParams.append('wanted_format', wantedFormat);

  const respones = await apiClient({
    api: 'metrics',
    service: `forecast_by_product?${queryParams.toString()}`,
    verb: 'get',
  });
  return respones.data;
};
