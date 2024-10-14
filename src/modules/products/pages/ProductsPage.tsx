import { mopsusIcons } from '../../../icons';
import Box from '../../../shared/box';
import styles from '../styles/products.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NewProduct, ProductFilters } from '../components';
import { useState } from 'react';

const PRODUCTS_AMOUNT = 145;

export const ProductsPage = () => {
  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleOpenNewProduct = (e) => {
    e.preventDefault();
    setIsOpenNewProduct(true);
  };

  const handleOpenFilter = (e) => {
    e.preventDefault();
    setIsOpenFilter(true);
  };

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Productos</h1>
        <div className={`${styles.productInformationContainer}`}>
          <div className={`${styles.circle}`}></div>
          <p className={`${styles.productInfoTitle}`}>
            {PRODUCTS_AMOUNT} productos
          </p>
        </div>
      </header>

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            className={styles.tableSearchInput}
            placeholder="Buscar por nombre"
            type="text"
          />
          <button className={styles.filterButton} onClick={handleOpenFilter}>
            <Icon fontSize={20} icon={mopsusIcons.filters}></Icon>
            Filtros
          </button>
        </div>
        <button className={styles.buttonAdd} onClick={handleOpenNewProduct}>
          Agregar producto
        </button>
      </section>

      {isOpenNewProduct && (
        <NewProduct isOpenNewProduct={isOpenNewProduct} onClose={() => setIsOpenNewProduct(false)} />
      )}

      {isOpenFilter && (
        <ProductFilters isOpen={isOpenFilter} setIsOpen={setIsOpenFilter} onApplyFilters={() => { }} onDeleteFilters={() => { }} >
          <h1>hoañ</h1>
        </ProductFilters>
      )}
    </Box>
  );
};
