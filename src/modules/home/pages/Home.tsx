import { useContext, useEffect } from 'react';
import Box from '../../../shared/box';
import styles from '../styles/home.module.scss';
import { HomeContext } from '../../../contexts/home/HomeContext';
import { HorizontalChart } from '../components/barGraphs/HorizontalChart';
import { DoughnutChart } from '../components/doughnutChart/doughnutChart';

import { SalesForecastingGraph } from '../components/customGraphs/SalesForecastingGraph';
import { VerticalChartWithDate } from '../components/customGraphs/VerticalChartWithDate';

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
    loadings,
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
          <DoughnutChart
            data={totalSaleByCategoryAppearances}
            title="Cantidad de ventas por categoría"
            subtitle="Según número de apariciones en el último mes"
            isLoading={loadings.totalSaleByCategoryAppearances}
          />

          <DoughnutChart
            data={totalSaleByCategoryMoney}
            title="Ingresos por categoría"
            subtitle="Según ingresos generados en el último mes"
            isMoney
            isLoading={loadings.totalSaleByCategoryMoney}
          />

          <HorizontalChart
            data={topSalesByAppearances}
            title="Top productos con más ventas"
            subtitle="Según número de apariciones en el último mes"
            isLoading={loadings.topSalesByAppearances}
          />

          <HorizontalChart
            data={topSalesByMoney}
            title="Top productos que generaron más ingresos"
            subtitle="Según ingresos generados en el último mes"
            isMoney
            isLoading={loadings.topSalesByMoney}
          />

          <SalesForecastingGraph
            data={salesForecastingByAppareances}
            title="Predicción de cantidad ventas"
            subtitle="Por apariciones"
            isLoading={loadings.salesForecastByAppareances}
          />

          <SalesForecastingGraph
            data={salesForecastingByMoney}
            title="Predicción de ingresos"
            subtitle="Medidos en ARS"
            isMoney
            isLoading={loadings.salesForecastByMoney}
          />

          <VerticalChartWithDate
            data={incomesAndSalesByHourByAppareances}
            title="Cantidad de ventas por horas"
            subtitle="Por apariciones"
            isLoading={loadings.salesAndIncomesForecastByAppearances}
            onApplyFilters={getSalesAndIncomesForecast}
          />

          <VerticalChartWithDate
            data={incomesAndSalesByHourByMoney}
            title="Ingresos generados por ventas por hora"
            subtitle="Medida en ARS"
            isLoading={loadings.salesAndIncomesForecastByMoney}
            onApplyFilters={getSalesAndIncomesForecast}
            isMoney
          />

          <VerticalChartWithDate
            data={forecastByProductByAppareances}
            title="Predicciones de producto"
            subtitle="Por apariciones"
            isLoading={loadings.productsForecastByAppearances}
            onApplyFilters={getProductsForecast}
          />
        </div>
      </div>
    </Box>
  );
};
