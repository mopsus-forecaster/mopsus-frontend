import Box from '../../../shared/box';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';

import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

const SALE_AMOUNT = 100;

export const Sales = () => {
  const { sales, isLoading, filters, setSales, totalPages, getPaginatedSales } =
    useContext(SaleContext);
  const salesTableColumns = [
    {
      text: 'Fecha de venta',
      value: 'saleDate',
      sort: true,
    },
    {
      text: 'Estado',
      value: 'isActive',
      sort: true,
    },
    {
      text: 'Importe total (ARS)',
      value: 'total',
      sort: true,
    },
    {
      text: 'Descuentos',
      value: 'discount',
      sort: true,
    },
    {
      text: 'Opciones',
      value: 'options',
      sort: false,
    },
  ];

  const options = [
    {
      icon: mopsusIcons.edit,

      onClick: () => {},
    },
  ];

  useEffect(() => {
    getPaginatedSales();
  }, []);

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Ventas</h1>
        <div className={`${styles.saleInformationContainer}`}>
          <div className={`${styles.circle}`}></div>
          <p className={`${styles.saleInfoTitle}`}>{SALE_AMOUNT} ventas</p>
        </div>
      </header>
      <section className={styles.tableActionsContainer}>
        <button className={styles.filterButton}>
          <Icon fontSize={24} icon={mopsusIcons.filters}></Icon>
          Filtros
        </button>
        <NavLink to={`/nueva-venta`}>
          <button className={styles.buttonAdd}>Agregar Venta</button>
        </NavLink>
      </section>
      <MopsusTable
        columns={salesTableColumns}
        goToFirstPage={() => {}}
        goToLastPage={() => {}}
        goToNextPage={() => {}}
        goToPreviousPage={() => {}}
        includeOptions={true}
        includePagination={true}
        isLoading={isLoading}
        options={options}
        page={filters.page}
        rows={sales}
        setRows={setSales}
        totalPages={totalPages}
      />
    </Box>
  );
};
