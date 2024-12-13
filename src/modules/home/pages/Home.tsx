import { useContext, useEffect } from 'react';
import Box from '../../../shared/box';
import styles from '../styles/home.module.scss';
import { HomeContext } from '../../../contexts/home/HomeContext';
import { HorizontalChart } from '../components/barGraphs/HorizontalChart';
import { DoughnutChart } from '../components/doughnutChart/doughnutChart';
import { VerticalChart } from '../components/barGraphs/VerticalChart';
import { LineChart } from '../components/lineGraphs/LineGraphs';
import { SalesForecastingGraph } from '../components/customGraphs/SalesForecastingGraph';

export const Home = () => {
  const {
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
  } = useContext(HomeContext);

  useEffect(() => {
    getTotalSalesByCategoryWanted('appearances');
    getTotalSalesByCategoryWanted('money');
    getTopSales('money');
    getTopSales('appearances');
    getSalesForecasting('appearances');
    getSalesForecasting('money');
    getSalesAndIncomesForecast('appearances');
    getSalesAndIncomesForecast('money');
    getProductsForecast('appearances');
    getProductsForecast('money');
  }, []);

  return (
    <Box>
      <div className={styles.container}>
        <header className={`${styles.header}`}>
          <h1 className={`${styles.title}`}>Inicio</h1>
        </header>
        <div className={styles.graphicsContainer}>
          {salesForecastingByAppareances && (
            <SalesForecastingGraph
              data={salesForecastingByAppareances}
              title="Prediccion de ventas"
              subtitle="Por apariciones"
            />
          )}

          {salesForecastingByMoney && (
            <SalesForecastingGraph
              data={salesForecastingByMoney}
              title="Prediccion de ventas"
              subtitle="Por unidades monetarias"
              isMoney={true}
            />
          )}
          {incomesAndSalesByHourByMoney && (
            <VerticalChart
              data={incomesAndSalesByHourByMoney}
              title="Ventas e ingresos por hora"
              subtitle="Por unidades monetarias"
            />
          )}

          {incomesAndSalesByHourByMoney && (
            <VerticalChart
              data={incomesAndSalesByHourByMoney}
              title="Ventas e ingresos por hora"
              subtitle="Por unidades monetarias"
            />
          )}
          {forecastByProductByAppareances && (
            <VerticalChart
              data={forecastByProductByAppareances}
              title="Prediciones de producto"
              subtitle="Por apariciones"
            />
          )}
          {forecastByProductByMoney && (
            <VerticalChart
              data={forecastByProductByMoney}
              title="Prediciones de producto"
              subtitle="Por unidades monetarias"
            />
          )}
          {totalSaleByCategoryAppearances && (
            <DoughnutChart
              data={totalSaleByCategoryAppearances}
              title="Ventas por categoría"
              subtitle="Según número de apariciones en el último mes"
            />
          )}
          {totalSaleByCategoryMoney && (
            <DoughnutChart
              data={totalSaleByCategoryMoney}
              title="Ventas por categoría"
              subtitle="Según ingresos generados en el último mes"
              isMoney={true}
            />
          )}
          {topSalesByAppearances && (
            <HorizontalChart
              data={topSalesByAppearances}
              title="Top ventas"
              subtitle="Según número de apariciones en el último mes"
              isMoney={false}
            />
          )}
          {topSalesByMoney && (
            <HorizontalChart
              data={topSalesByMoney}
              title="Top ventas"
              subtitle="Según ingresos generados en el último mes"
              isMoney={true}
            />
          )}
        </div>
      </div>
    </Box>
  );
};
