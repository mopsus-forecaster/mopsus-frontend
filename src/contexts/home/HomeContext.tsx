import { createContext, useState } from 'react';
import {
  salesAndIncmesForecastByHour,
  salesForecast,
} from '../../services/metrics';
import {
  getTotalSales,
  getTotalSalesByCategory,
  forecastByProduct,
} from '../../services/metrics';

export const HomeContext = createContext(null);

enum wantedFormats {
  APPREANCE = 'appearances',
  MONEY = 'money',
}

export const HomeProvider = ({ children }) => {
  const [totalSaleByCategoryAppearances, settotalSaleByCategoryAppearances] =
    useState(null);

  const [totalSaleByCategoryMoney, settotalSaleByCategoryMoney] =
    useState(null);

  const [topSalesByAppearances, setTopSalesByAppearances] = useState(null);
  const [topSalesByMoney, setTopSalesByMoney] = useState(null);
  const [salesForecastingByAppareances, setSalesForecastingByAppareances] =
    useState(null);

  const [salesForecastingByMoney, setSalesForecastingByMoney] = useState(null);

  const [
    incomesAndSalesByHourByAppareances,
    setIncomesAndSalesByHourByAppareances,
  ] = useState(null);

  const [incomesAndSalesByHourByMoney, setIncomesAndSalesByHourByMoney] =
    useState(null);

  const [forecastByProductByAppareances, setForecastByProductByAppareances] =
    useState(null);
  const [forecastByProductByMoney, setForecastByProductByMoney] =
    useState(null);

  const [loadings, setLoadings] = useState({
    totalSalesByMoney: true,
    totalSalesByAppareances: true,
    topSalesByMoney: true,
    salesForecastByAppareances: true,
    salesForecastByMoney: true,
    salesAndIncomesForecastByMoney: true,
    productsForecastByAppareances: true,
    productsForecastByMoney: true,
  });

  const getTotalSalesByCategoryWanted = async (wantedFormat) => {
    try {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'totalSaleByCategoryByAppearances'
          : 'totalSaleByCategoryByMoney']: true,
      }));

      const response = await getTotalSalesByCategory(wantedFormat);

      if (response && wantedFormat === wantedFormats.APPREANCE) {
        settotalSaleByCategoryAppearances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        settotalSaleByCategoryMoney(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'totalSaleByCategoryByAppearances'
          : 'totalSaleByCategoryByMoney']: false,
      }));
    }
  };

  const getTopSales = async (wantedFormat) => {
    try {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'topSalesByAppearances'
          : 'topSalesByMoney']: true,
      }));
      const response = await getTotalSales(wantedFormat);

      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setTopSalesByAppearances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setTopSalesByMoney(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'topSalesByAppearances'
          : 'topSalesByMoney']: false,
      }));
    }
  };

  const getSalesForecasting = async (wantedFormat, startDate, endDate) => {
    try {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'salesForecastByAppareances'
          : 'salesForecastByMoney']: true,
      }));
      const response = await salesForecast(startDate, endDate, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setSalesForecastingByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setSalesForecastingByMoney(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'salesForecastByAppareances'
          : 'salesForecastByMoney']: false,
      }));
    }
  };
  const getSalesAndIncomesForecast = async (wantedFormat, date) => {
    try {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'salesAndIncomesForecastByAppearances'
          : 'salesAndIncomesForecastByMoney']: true,
      }));
      const response = await salesAndIncmesForecastByHour(date, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setIncomesAndSalesByHourByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setIncomesAndSalesByHourByMoney(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'salesAndIncomesForecastByAppearances'
          : 'salesAndIncomesForecastByMoney']: false,
      }));
    }
  };

  const getProductsForecast = async (wantedFormat, date) => {
    try {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'productsForecastByAppearances'
          : 'productsForecastByMoney']: true,
      }));
      const response = await forecastByProduct(date, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setForecastByProductByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setForecastByProductByMoney(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadings((prevState) => ({
        ...prevState,
        [wantedFormat === wantedFormats.APPREANCE
          ? 'productsForecastByAppearances'
          : 'productsForecastByMoney']: false,
      }));
    }
  };

  return (
    <HomeContext.Provider
      value={{
        getTotalSalesByCategoryWanted,
        getTopSales,
        getSalesForecasting,
        getSalesAndIncomesForecast,
        getProductsForecast,
        totalSaleByCategoryAppearances,
        totalSaleByCategoryMoney,
        topSalesByAppearances,
        topSalesByMoney,
        salesForecastingByAppareances,
        salesForecastingByMoney,
        incomesAndSalesByHourByAppareances,
        incomesAndSalesByHourByMoney,
        forecastByProductByAppareances,
        forecastByProductByMoney,
        loadings,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
