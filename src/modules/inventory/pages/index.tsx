import Box from '../../../shared/box';
import styles from '../styles/inventory.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../../../shared/filter';
import { useContext, useEffect, useState } from 'react';
import { InventoryFilter } from '../components/IntentoryFilter';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { DetailsIncome } from '../components/DetailsIncome';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';



export const Inventory = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const navigate = useNavigate();

  const {
    filters,
    totalPages,
    isLoading,
    goToLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    incomes,
    setIncomes,
    getPaginatedInventory,
    handleSetIncomeToEdit,
    deleteIncomeFromTable
  } = useContext(InventoryContext)


  const inventoryTableColums = [
    {
      text: 'N°',
      value: 'formatId',
      sort: true,
    },
    {
      text: 'Fecha',
      value: 'date',
      sort: true,
    },
    {
      text: 'Estado',
      value: 'isActive',
      sort: true,
    },
    {
      text: 'Ingreso/Egreso',
      value: 'isAdjustment',
      sort: true,
    },
    {
      text: 'Opciones',
      value: 'options',
      sort: false,
    }
  ]

  const options = [
    {
      icon: mopsusIcons.details,
      onClick: handleSetIncomeToEdit,
    },
    {
      icon: mopsusIcons.trash,
      onClick: deleteIncomeFromTable,
    }
  ];

  useEffect(() => {
    getPaginatedInventory();
  }, [filters]);
  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Inventario</h1>
        <div className={`${styles.saleInformationContainer}`}></div>
      </header>

      <section className={styles.tableActionsContainer}>
        <div className={styles.tableSearchComponent}>
          <input
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
        <button className={styles.buttonAdd} onClick={() => navigate('/nuevo-ingreso')}>Agregar inventario</button>
      </section>
      <div className={styles.boxContainerInventory}>
        <section className={styles.boxInventory}>
          <header>
            <div className={styles.contentBoxInventory}>
              <p className={styles.titleBoxInventory}>Ingresos/Egresos</p>
              <hr className={styles.line} />
            </div>
          </header>
          <MopsusTable
            columns={inventoryTableColums}
            rows={incomes}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            includeOptions={true}
            includePagination={true}
            isLoading={isLoading}
            options={options}
            page={filters.page}
            setRows={setIncomes}
            totalPages={totalPages}
          />
        </section>
        <DetailsIncome />
      </div>

      {isOpenFilter && (
        <Filter
          isOpen={isOpenFilter}
          setIsOpen={setIsOpenFilter}
          onApplyFilters={() => {
            setIsOpenFilter(false);
          }}
          onDeleteFilters={() => {
            setIsOpenFilter(false);
          }}
        >
          <InventoryFilter filters={filters} />
        </Filter>
      )}
    </Box>
  );
};
