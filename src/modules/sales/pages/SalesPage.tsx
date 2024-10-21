import Box from '../../../shared/box';
import styles from '../styles/sales.module.scss'
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
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
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';



const SALE_AMOUNT = 100
type Order = 'asc' | 'desc';



export const Sales = () => {
  const [valueToOrderBy, setValueToOrderBy] = useState();
  const [orderDirection, setOrderDirection] = useState<Order>();
  const navigate = useNavigate()

  const productsTableColumns = [
    {
      text: 'Fecha de venta',
      value: 'saleDate',
      sort: true,
    },
    {
      text: 'Estado',
      value: 'state',
      sort: true,
    },
    {
      text: 'Importe total (ARS)',
      value: 'totalAmount',
      sort: true,
    },
    {
      text: 'Descuentos',
      value: 'discounts',
      sort: true,
    },
    {
      text: 'Opciones',
      value: 'options',
      sort: false,
    },
  ];
  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Ventas</h1>
        <div className={`${styles.saleInformationContainer}`}>
          <div className={`${styles.circle}`}></div>
          <p className={`${styles.saleInfoTitle}`}>
            {SALE_AMOUNT} ventas
          </p>
        </div>
      </header>
      <section className={styles.tableActionsContainer}>
        <button className={styles.filterButton}>
          <Icon fontSize={20} icon={mopsusIcons.filters}></Icon>
          Filtros
        </button>
        <NavLink to={`/nueva-venta`}>
          <button className={styles.buttonAdd}>
            Agregar Venta
          </button>
        </NavLink>

      </section>
    </Box >
  )
};
