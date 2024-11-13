import Box from '../../../shared/box';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import {
  INITIAL_FILTERS,
  SaleContext,
} from '../../../contexts/Sales/SalesContext';
import { Filter } from '../../../shared/filter';
import { SalesFilter } from '../components/SalesFilter';
import { SaleDetails } from '../components/SaleDateils';
import { Value } from 'sass';

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
    totalCount
  } = useContext(SaleContext);
  const [search, setSearch] = useState(null)
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const salesTableColumns = [
    {
      text: 'ID',
      value: 'formatId',
      sort: true,
    },
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
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    getPaginatedSales();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prevFilters) => {
        const newFilters = {
          ...prevFilters,
          sale_id: search ? search : null,
        };

        getPaginatedSales(newFilters);

        return newFilters;
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Ventas</h1>
        {
          (totalCount === 0 || totalCount) &&
          <div className={`${styles.saleInformationContainer}`}>
            <div className={`${styles.circle}`}></div>
            <p className={`${styles.saleInfoTitle}`}>{totalCount} ventas</p>
          </div>
        }
      </header>
      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className={styles.tableSearchInput}
            placeholder="Buscar por id..."
            type="text"
          />
          <button
            className={styles.filterButton}
            onClick={() => setIsOpenFilter(true)}
          >
            <Icon fontSize={24} icon={mopsusIcons.filters} />
            Filtros
          </button>
        </div>
        <button
          className={styles.buttonAdd}
          onClick={() => navigate('/nueva-venta')}
        >
          Agregar Venta
        </button>
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
      {isOpenFilter && (
        <Filter
          isOpen={isOpenFilter}
          setIsOpen={setIsOpenFilter}
          onApplyFilters={() => {
            getPaginatedSales();
            setIsOpenFilter(false);
          }}
          onDeleteFilters={() => {
            setFilters(INITIAL_FILTERS);
            getPaginatedSales(INITIAL_FILTERS);
            setIsOpenFilter(false);
          }}
        >
          <SalesFilter filters={filters} setFilters={setFilters} />
        </Filter>
      )}

      {saleDetails && (
        <SaleDetails
          handleSetSaleToDetails={handleSetSaleToDetails}
          saleDetails={saleDetails}
        />
      )}
    </Box>
  );
};
