import Box from '../../../shared/box';
import styles from '../styles/sales.module.scss';
import { ProductFind } from '../components/ProductFind';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { SummarySales } from './SummarySales';

export const NewSale = () => {
  const [search, setSearch] = useState('');
  const { setFilters, getProductsAll, filters } = useContext(ProductsContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prevFilters) => ({ ...prevFilters, title: search, page: null, is_active: null }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    getProductsAll();
  }, [filters]);

  return (
    <Box>
      <header className={styles.header}>
        <h1 className={styles.title}>Registrar ventas</h1>
        <section className={styles.tableActionsContainerBuscar}>
          <div className={styles.tableSearchComponent}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              className={styles.tableSearchInput}
              placeholder="Buscar por nombre de producto o códogo de barra..."
            />
          </div>
        </section>
      </header>
      <div className={styles.boxContainer}>
        <ProductFind />
      </div>
      <div className={styles.boxContainer}>
        <SummarySales />
      </div>
    </Box>
  );
};
