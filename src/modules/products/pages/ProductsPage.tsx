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

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  CircularProgress,
} from '@mui/material';

const PRODUCTS_AMOUNT = 145;

type Order = 'asc' | 'desc';

export const ProductsPage = () => {
  const [isOpenNewProduct, setIsOpenNewProduct] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const {
    mappedProducts,
    isLoading,
    setFilters,
    getProducts,
    deleteProductFromTable,
    setMappedProducts,
    filters,
  } = useContext(ProductsContext);
  const [search, setSearch] = useState('');

  const handleOpenNewProduct = (e) => {
    e.preventDefault();
    setIsOpenNewProduct(true);
  };

  const handleOpenFilter = (e) => {
    e.preventDefault();
    setIsOpenFilter(true);
  };

  const [valueToOrderBy, setValueToOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState<Order>();
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
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
    const timeoutId = setTimeout(() => {
      setFilters((prevFilters) => ({ ...prevFilters, title: search }));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const productsTableColumns = [
    {
      text: 'Nombre',
      value: 'productName',
      orderBy: true,
    },
    {
      text: 'Precio',
      value: 'price',
      orderBy: true,
    },
    {
      text: 'Stock',
      value: 'stock',
      orderBy: true,
    },
    {
      text: 'Punto de reposicion',
      value: 'repositionPoint',
      orderBy: true,
    },
    {
      text: 'Categoria',
      value: 'category',
      orderBy: true,
    },
    {
      text: 'Estado',
      value: 'state',
      orderBy: true,
    },
    {
      text: 'Opciones',
      value: 'options',
      orderBy: false,
    },
  ];

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<
    T extends Record<Key, number | string>,
    Key extends keyof T,
  >(order: Order, orderBy: Key): (a: T, b: T) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const createSortHandler = (property: string) => {
    const isAsc = valueToOrderBy === property && orderDirection === 'asc';
    const newOrderDirection = isAsc ? 'desc' : 'asc';

    setOrderDirection(newOrderDirection);
    setValueToOrderBy(property);

    const sortedProducts = [...mappedProducts].sort((a, b) => {
      if (newOrderDirection === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });

    setMappedProducts(sortedProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

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

      <TableContainer
        sx={{ width: '95%', margin: '2.5% auto', height: '40vh' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {productsTableColumns.map(({ value, text }) => (
                <TableCell
                  key={value}
                  sx={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #979797',
                    color: '#979797',
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                  }}
                  align="center"
                >
                  <TableSortLabel
                    onClick={() => createSortHandler(value)}
                    active={valueToOrderBy === value}
                    sx={{
                      opacity: 100,
                      textAlign: 'center',
                      '&.Mui-active': {
                        color: '#979797',
                        fontWeight: 600,
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: '#FFF',
                        fontWeight: 600,
                      },
                      '&.Mui-active .MuiTableSortLabel-icon': {
                        color: '#979797',
                        fontWeight: 600,
                      },
                      '&:hover': {
                        color: '#979797',
                        fontWeight: 600,
                        '& .MuiTableSortLabel-icon': {
                          color: '#979797',
                          fontWeight: 600,
                        },
                      },
                    }}
                    direction={
                      valueToOrderBy === value
                        ? orderDirection === 'asc'
                          ? 'asc'
                          : 'desc'
                        : 'asc'
                    }
                  >
                    {text}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={productsTableColumns.length}
                  sx={{
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'Montserrat',
                  }}
                  align="center"
                >
                  <CircularProgress
                    sx={{
                      margin: '7.5% auto 1rem auto',
                      color: '#4a7370',
                      opacity: 100,
                    }}
                  />
                  <p>Cargando datos...</p>
                </TableCell>
              </TableRow>
            ) : mappedProducts && mappedProducts.length > 0 ? (
              stableSort(
                mappedProducts,
                getComparator(orderDirection, valueToOrderBy)
              ).map((row, index) => (
                <TableRow key={index}>
                  {productsTableColumns.map((column) => (
                    <TableCell
                      sx={{
                        border: 'none',
                        color: '#ffff',
                        fontFamily: 'Montserrat',
                      }}
                      align="center"
                      key={column.value}
                    >
                      {column.value === 'options' ? (
                        <Icon
                          style={{ color: '#ffff', fontSize: '1.2rem' }}
                          icon={mopsusIcons.trash}
                          onClick={() => deleteProductFromTable(index)}
                        />
                      ) : (
                        row[column.value]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={productsTableColumns.length}
                  sx={{
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'Montserrat',
                  }}
                  align="center"
                >
                  <p
                    style={{
                      color: '#ffff',
                      textAlign: 'center',
                      marginTop: '10rem',
                    }}
                  >
                    No se encontraron productos
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          <form className={styles.formFilter}>
            <div className={styles.formGroup}>
              <label htmlFor="category_id" className={styles.modalLabel}>
                Categoría
              </label>
              <select
                name=""
                id=""
                className={styles.selectFilter}
                value={filters.category_id || ''}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    category_id: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.description}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay categorías disponibles
                  </option>
                )}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="unit_id" className={styles.modalLabel}>
                Unidad
              </label>
              <select
                name=""
                id=""
                className={styles.selectFilter}
                value={filters.unit_id || ''}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    unit_id: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Seleccione una unidad
                </option>
                {units.length > 0 ? (
                  units.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.description}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay unidades disponibles
                  </option>
                )}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="below_reposition" className={styles.modalLabel}>
                Punto de reposición
              </label>
              <select
                id="below_reposition"
                name="below_reposition"
                className={styles.selectFilter}
                value={filters.below_reposition || ''}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    below_reposition: e.target.value,
                  }))
                }
              >
                <option value="">Seleccione un opción</option>
                <option value="true">Por debajo</option>
                <option value="false">Por encima</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price_min" className={styles.modalLabel}>
                Rango de precio
              </label>
              <div className={styles.priceContainer}>
                <input
                  type="number"
                  id="price_min"
                  name="price_min"
                  placeholder="Mínimo"
                  min={0}
                  className={styles.inputPrice}
                  value={filters.price_min || ''}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      price_min: e.target.value,
                    }))
                  }
                />
                <Icon icon={mopsusIcons.guion} fontSize={35} />
                <input
                  type="number"
                  id="price_max"
                  name="price_max"
                  placeholder="Máximo"
                  min={0}
                  className={styles.inputPrice}
                  value={filters.price_max || ''}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      price_max: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="is_active" className={styles.modalLabel}>
                Estado
              </label>
              <select
                id="is_active"
                name="is_active"
                className={styles.selectFilter}
                value={filters.is_active || ''}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    is_active: e.target.value,
                  }))
                }
              >
                <option value="">--</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </form>
        </Filter>
      )}
    </Box>
  );
};
