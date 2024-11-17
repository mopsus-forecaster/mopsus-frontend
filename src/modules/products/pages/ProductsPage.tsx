import { useContext, useEffect, useState } from 'react';
import { mopsusIcons } from '../../../icons';
import Box from '../../../shared/box';
import styles from '../styles/products.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NewProduct } from '../components';
import { Filter } from '../../../shared/filter';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { getCategories, getUnits } from '../../../services/products';
import { INITIAL_FILTERS } from '../../../contexts/Products/ProductsContext';
import { ModifyProduct } from '../components/ModifyProduct';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { productsTableColumns } from '../data/productsColumns';
import { ProductFilters } from '../components/ProductFilters';

export const ProductsPage = () => {
  const {
    mappedProducts,
    isLoading,
    setFilters,
    getProducts,
    deleteProductFromTable,
    setMappedProducts,
    filters,
    handleSetProductToEdit,
    editProduct,
    totalPages,
    goToLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    totalCount,
  } = useContext(ProductsContext);

  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const options = [
    {
      icon: mopsusIcons.edit,

      onClick: handleSetProductToEdit,
    },
    {
      icon: mopsusIcons.trash,

      onClick: deleteProductFromTable,
    },
  ];

  const handleOpenNewProduct = (e) => {
    e.preventDefault();
    setIsOpenNewProduct(true);
  };

  const handleOpenFilter = (e) => {
    e.preventDefault();
    setIsOpenFilter(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!firstLoad) {
        setFilters((prevFilters) => {
          const newFilters = {
            ...prevFilters,
            title: search ? search : null,
          };

          getProducts(newFilters);

          return newFilters;
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    if (firstLoad) {
      const getCategoriesOptions = async () => {
        try {
          const { categorias } = await getCategories();
          if (categorias) {
            setCategories(categorias);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const getUnitsOptions = async () => {
        try {
          const { unidades } = await getUnits();
          if (unidades) {
            setUnits(unidades);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getCategoriesOptions();
      getUnitsOptions();
      getProducts();
      setFirstLoad(false);
    }

    return () => {
      setFilters(INITIAL_FILTERS);
    };
  }, []);

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Productos</h1>
        {(totalCount === 0 || totalCount) && (
          <div className={`${styles.productInformationContainer}`}>
            <div className={`${styles.circle}`}></div>

            <p className={`${styles.productInfoTitle}`}>
              {totalCount} productos
            </p>
          </div>
        )}
      </header>

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
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

      <MopsusTable
        columns={productsTableColumns}
        rows={mappedProducts}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        includeOptions={true}
        includePagination={true}
        isLoading={isLoading}
        options={options}
        page={filters.page}
        setRows={setMappedProducts}
        totalPages={totalPages.current}
      />

      {isOpenNewProduct && (
        <NewProduct
          isOpenNewProduct={isOpenNewProduct}
          onClose={() => setIsOpenNewProduct(false)}
        />
      )}

      {isOpenFilter && (
        <Filter
          isOpen={isOpenFilter}
          setIsOpen={setIsOpenFilter}
          onApplyFilters={() => {
            getProducts();
            setIsOpenFilter(false);
          }}
          onDeleteFilters={() => {
            setFilters(INITIAL_FILTERS);
            getProducts(INITIAL_FILTERS);
            setIsOpenFilter(false);
          }}
        >
          <ProductFilters
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            units={units}
          />
        </Filter>
      )}

      {editProduct && (
        <ModifyProduct
          editProduct={editProduct}
          setEditProduct={handleSetProductToEdit}
        />
      )}
    </Box>
  );
};
