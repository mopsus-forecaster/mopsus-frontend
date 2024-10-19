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
      <TableContainer
        sx={{ width: '95%', margin: '2.5% auto', height: '40vh' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {productsTableColumns.map(({ value, text, sort }) => (
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
                  {sort ? <TableSortLabel
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
                  </TableSortLabel> : <span
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      color: '#979797',
                      opacity: 100
                    }}
                  >
                    {`${text}`}
                  </span>}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

    </Box >
  )
};
