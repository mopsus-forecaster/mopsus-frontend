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

  const getTotalSalesByCategoryWanted = async (wantedFormat) => {
    try {
      const response = await getTotalSalesByCategory(wantedFormat);

      if (response && wantedFormat === wantedFormats.APPREANCE) {
        settotalSaleByCategoryAppearances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        settotalSaleByCategoryMoney(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTopSales = async (wantedFormat) => {
    try {
      const response = await getTotalSales(wantedFormat);

      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setTopSalesByAppearances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setTopSalesByMoney(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesForecasting = async (wantedFormat, startDate, endDate) => {
    console.log(startDate, endDate);
    try {
      const response = await salesForecast(startDate, endDate, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setSalesForecastingByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setSalesForecastingByMoney(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesAndIncomesForecast = async (wantedFormat, date) => {
    try {
      const response = await salesAndIncmesForecastByHour(date, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setIncomesAndSalesByHourByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setIncomesAndSalesByHourByMoney(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsForecast = async (wantedFormat, date) => {
    try {
      const response = await forecastByProduct(date, wantedFormat);
      if (response && wantedFormat === wantedFormats.APPREANCE) {
        setForecastByProductByAppareances(response);
      }
      if (response && wantedFormat === wantedFormats.MONEY) {
        setForecastByProductByMoney(response);
      }
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
