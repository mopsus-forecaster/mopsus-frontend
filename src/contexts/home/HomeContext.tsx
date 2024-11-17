import { createContext, useState } from 'react';
import { getTotalSales, getTotalSalesByCategory } from '../../services/metrics';

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

  return (
    <HomeContext.Provider
      value={{
        getTotalSalesByCategoryWanted,
        getTopSales,
        totalSaleByCategoryAppearances,
        totalSaleByCategoryMoney,
        topSalesByAppearances,
        topSalesByMoney,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
