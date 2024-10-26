import Box from '../../../shared/box';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { Filter } from '../../../shared/filter';
import { SalesFilter } from '../components/SalesFilter'
import { SaleDetails } from '../components/SaleDateils';

const SALE_AMOUNT = 100;

export const Sales = () => {
  const {
    sales,
    isLoading,
    filters,
    setFilters,
    setSales,
    totalPages,
    getPaginatedSales,
    goToFirstPage,
    goToNextPage,
    goToPreviousPage,
    goToLastPage,
    deleteSaleFromTable,
    handleSetSaleToDetails,
    saleDetails,
    formatDate,
  } = useContext(SaleContext);

  const [isOpenFilter, setIsOpenFilter] = useState(false);
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
      icon: mopsusIcons.details,
      onClick: handleSetSaleToDetails,
    },
    {
      icon: mopsusIcons.trash,
      onClick: deleteSaleFromTable,
    }
  ];





  useEffect(() => {
    getPaginatedSales();

  }, [filters]);

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
        <button className={styles.filterButton} onClick={() => setIsOpenFilter(true)}>
          <Icon fontSize={24} icon={mopsusIcons.filters}></Icon>
          Filtros
        </button>
        <NavLink to={`/nueva-venta`}>
          <button className={styles.buttonAdd}>Agregar Venta</button>
        </NavLink>
      </section>
      <MopsusTable
        columns={salesTableColumns}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        includeOptions={true}
        includePagination={true}
        isLoading={isLoading}
        options={options}
        page={filters.page}
        rows={sales}
        setRows={setSales}
        totalPages={totalPages}
      />
      {
        isOpenFilter && (
          <Filter
            isOpen={isOpenFilter}
            setIsOpen={setIsOpenFilter}
            onApplyFilters={() => {
              getPaginatedSales();
              setIsOpenFilter(false);
            }}
            onDeleteFilters={() => {
              setIsOpenFilter(false);
            }}
          >
            <SalesFilter
              filters={filters}
              setFilters={setFilters}
            />
          </Filter>
        )
      }

      {
        saleDetails && (
          <SaleDetails
            handleSetSaleToDetails={handleSetSaleToDetails}
            saleDetails={saleDetails}
          />
        )

      }
    </Box>
  );
};
