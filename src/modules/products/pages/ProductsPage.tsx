import { useContext, useEffect, useState } from 'react';
import { mopsusIcons } from '../../../icons';
import Box from '../../../shared/box';
import styles from '../styles/products.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Filter } from '../../../shared/filter';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { getBrands, getCategories, getUnits } from '../../../services/products';
import { INITIAL_FILTERS } from '../../../contexts/Products/ProductsContext';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { productsTableColumns } from '../data/productsColumns';
import { ProductFilters } from '../components/ProductFilters';
import { MapProductTables } from '../utils/product-table-mapper';
import { useNavigate } from 'react-router-dom';
import { UpdatePrice } from '../components/UpdatePrice';

export const ProductsPage = () => {
  const {
    mappedProducts,
    isLoading,
    setFilters,
    getProducts,
    setMappedProducts,
    filters,
    totalPages,
    goToLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    totalCount,
    setStateFrom,
    stateFrom,
  } = useContext(ProductsContext);

  console.log(stateFrom);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const navigate = useNavigate();

  const handleOpenUpdatePrice = (e) => {
    e.preventDefault();
    setIsOpenUpdate(true);
  };

  const handleNewProduct = (e) => {
    e.preventDefault();
    setStateFrom('P');
    navigate('/nuevo-producto');
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

      const getBrandOptions = async () => {
        try {
          const { marcas } = await getBrands();
          if (marcas) {
            setBrands(marcas);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getBrandOptions();
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
      </header>

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className={styles.tableSearchInput}
            placeholder="Buscar por nombre o código de barra..."
            type="text"
          />
          <button className={styles.filterButton} onClick={handleOpenFilter}>
            <Icon fontSize={20} icon={mopsusIcons.filters}></Icon>
            Filtros
          </button>
        </div>
        <div className={styles.btnContainerProd}>
          <button className={`${styles.buttonAdd} `} onClick={handleNewProduct}>
            Registrar producto
          </button>
          <button
            className={` ${styles.buttonAdd} `}
            onClick={handleOpenUpdatePrice}
          >
            Actualizar precios
          </button>
        </div>
      </section>

      <MopsusTable
        columns={productsTableColumns}
        rows={mappedProducts.map((product) => MapProductTables(product))}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        includeOptions={false}
        includePagination={true}
        isLoading={isLoading}
        page={filters.page}
        setRows={setMappedProducts}
        totalPages={totalPages.current}
        totalElements={totalCount}
      />

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
            brands={brands}
          />
        </Filter>
      )}

      {isOpenUpdate && (
        <UpdatePrice
          brand={brands}
          category={categories}
          setIsOpenUpdate={setIsOpenUpdate}
        />
      )}
    </Box>
  );
};
