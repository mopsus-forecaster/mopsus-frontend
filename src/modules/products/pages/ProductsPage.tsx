import { mopsusIcons } from '../../../icons';
import Box from '../../../shared/box';
import styles from '../styles/products.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';

const PRODUCTS_AMOUNT = 145;

export const ProductsPage = () => {
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

      {/* Aca se va a reemplazar todo por un componente llamado MopsusTable pero mientras lo vamos a ir trabajando aca */}

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            className={styles.tableSearchInput}
            placeholder="Buscar por nombre"
            type="text"
          />
          {/* Aca vas a gestionar un estado que abra el componente de Filters con un onClick => handleOpenProductFilters  */}
          <button className={styles.filterButton}>
            <Icon fontSize={20} icon={mopsusIcons.filters}></Icon>
            Filtros
          </button>
        </div>
        {/* Aca vas a gestionar un estado que abra el componente de NewProduct con un onClick => handleOpenNewProuct */}
        <button className={styles.buttonAdd}>Agregar producto</button>
      </section>

      {/* Aca abajo te dejo los componentes, deberias tenerlos invisibles atado al isOpen */}

      {/* <NewProduct isOpen={isOpen}/>
      <ProductFilters  isOpen={isOpen}/> */}
    </Box>
  );
};
