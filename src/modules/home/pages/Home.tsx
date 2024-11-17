import { useContext, useEffect } from 'react';
import Box from '../../../shared/box';
import styles from '../styles/home.module.scss';
import { HomeContext } from '../../../contexts/home/HomeContext';
import { HorizontalChart } from '../components/barGraphs/HorizontalChart';
import { DoughnutChart } from '../components/doughnutChart/doughnutChart';

export const Home = () => {
  const {
    totalSaleByCategoryAppearances,
    totalSaleByCategoryMoney,
    getTotalSalesByCategoryWanted,
    getTopSales,
    topSalesByAppearances,
    topSalesByMoney,
  } = useContext(HomeContext);

  useEffect(() => {
    getTotalSalesByCategoryWanted('appearances');
    getTotalSalesByCategoryWanted('money');
    getTopSales('money');
    getTopSales('appearances');
  }, []);

  return (
    <Box>
      <div className={styles.container}>
        <header className={`${styles.header}`}>
          <h1 className={`${styles.title}`}>Inicio</h1>
        </header>
        <div className={styles.graphicsContainer}>
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
