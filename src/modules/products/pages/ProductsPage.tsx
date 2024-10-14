import { useState } from 'react';
import { mopsusIcons } from '../../../icons';
import Box from '../../../shared/box';
import styles from '../styles/products.module.scss';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@mui/material';

const PRODUCTS_AMOUNT = 145;

type Order = 'asc' | 'desc';

export const ProductsPage = () => {
  const [valueToOrderBy, setValueToOrderBy] = useState('productName');
  const [orderDirection, setOrderDirection] = useState<Order>('asc');

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
  ];

  const mockedProducts = [
    {
      productName: 'Super8',
      price: '$300.00',
      stock: 120,
      repositionPoint: 20,
    },
    {
      productName: 'Chocman',
      price: '$350.00',
      stock: 150,
      repositionPoint: 10,
    },
    {
      productName: 'Jorgito',
      price: '$500.00',
      stock: 90,
      repositionPoint: 35,
    },
    {
      productName: 'Facturas',
      price: '$600.00',
      stock: 200,
      repositionPoint: 18,
    },
    {
      productName: 'Completos',
      price: '$2,000.00',
      stock: 100,
      repositionPoint: 7,
    },
    {
      productName: 'Chubi',
      price: '$400.00',
      stock: 50,
      repositionPoint: 10,
    },
    {
      productName: 'Milanesas',
      price: '$10,000.00',
      stock: 79,
      repositionPoint: 55,
    },
    {
      productName: 'Chocolate Milka',
      price: '$1,000.00',
      stock: 55,
      repositionPoint: 40,
    },
    {
      productName: 'Eso que te gusta',
      price: '$20,000.00',
      stock: 35,
      repositionPoint: 38,
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
  const createSortHandler = (property: string, direction: Order) => {
    setValueToOrderBy(property);
    setOrderDirection(direction);
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
          <button className={styles.filterButton}>
            <Icon fontSize={20} icon={mopsusIcons.filters}></Icon>
            Filtros
          </button>
        </div>
        <button className={styles.buttonAdd}>Agregar producto</button>
      </section>

      <TableContainer sx={{ width: '95%', margin: '2.5% auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {productsTableColumns.map(({ value, text, orderBy: sort }) => (
                <TableCell
                  key={value}
                  sx={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #979797',
                    color: '#979797',
                    fontFamily: 'Montserrat',
                  }}
                  align="center"
                >
                  {sort ? (
                    <TableSortLabel
                      active={valueToOrderBy === value}
                      direction={orderDirection}
                      onClick={() =>
                        createSortHandler(
                          value,
                          orderDirection === 'asc' ? 'desc' : 'asc'
                        )
                      }
                    >
                      {text}
                    </TableSortLabel>
                  ) : (
                    <span>{text}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(
              mockedProducts,
              getComparator(orderDirection, valueToOrderBy)
            ).map((row, index) => (
              <TableRow key={index} sx={{}}>
                {productsTableColumns.map((column) => (
                  <TableCell
                    align="center"
                    key={column.value}
                    sx={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: '#FFF',
                    }}
                  >
                    {row[column.value]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Aca abajo te dejo los componentes, deberias tenerlos invisibles atado al isOpen */}

      {/* <NewProduct isOpen={isOpen}/>
      <ProductFilters  isOpen={isOpen}/> */}
    </Box>
  );
};
