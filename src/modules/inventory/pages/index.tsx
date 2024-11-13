import Box from '../../../shared/box';
import styles from '../styles/inventory.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../../../shared/filter';
import { useContext, useEffect, useState } from 'react';
import { InventoryFilter } from '../components/IntentoryFilter';
import { INITIAL_FILTERS, InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { DetailsIncome } from '../components/DetailsIncome';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';



export const Inventory = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [search, setSearch] = useState(null);

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
    deleteIncomeFromTable,
    setFilters,
    totalIncomes
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
      text: 'Ingreso/Ajuste',
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
    const timeoutId = setTimeout(() => {
      setFilters((prevFilters) => {
        const newFilters = {
          ...prevFilters,
          id_incomes: search ? search : null,
        };

        getPaginatedInventory(newFilters);
        console.log(newFilters)
        return newFilters;
      });
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    getPaginatedInventory();
  }, []);

  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Inventario</h1>
        {
          (totalIncomes === 0 || totalIncomes) &&
          <div className={`${styles.saleInformationContainer}`}>
            <div className={`${styles.circle}`}></div>
            <p className={`${styles.saleInfoTitle}`}>{totalIncomes} ingresos</p>
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
        <div className={styles.btnContainer}>
          <button className={styles.buttonAdd} onClick={() => navigate('/nuevo-ajuste')}>Agregar Ajuste</button>
          <button className={styles.buttonAdd} onClick={() => navigate('/nuevo-ingreso')}>Agregar inventario</button>
        </div>
      </section>
      <div className={styles.boxContainerInventory}>
        <section className={styles.boxInventory}>
          <header>
            <div className={styles.contentBoxInventory}>
              <p className={styles.titleBoxInventory}>Ingresos/Egresos</p>
              <hr className={styles.line2} />
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
            getPaginatedInventory(filters)
          }}
          onDeleteFilters={() => {
            setIsOpenFilter(false);
            getPaginatedInventory(INITIAL_FILTERS)
          }}
        >
          <InventoryFilter filters={filters} setFilters={setFilters} />
        </Filter>
      )}
    </Box>
  );
};
