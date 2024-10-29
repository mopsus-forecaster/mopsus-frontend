import Box from '../../../shared/box';
import styles from '../styles/inventory.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../../../shared/filter';
import { useContext, useEffect, useState } from 'react';
import { InventoryFilter } from '../components/IntentoryFilter';
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';



export const Inventory = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const navigate = useNavigate()

  const {
    filters,
    totalPages,
    isLoading,
    goToLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    inventory,
    setInventory,
    getPaginatedInventory,
    handleSetInventoryToDetails
  } = useContext(InventoryContext)

  const inventoryTableColumns = [
    {
      text: 'Fecha',
      value: 'date',
      sort: true,
    },
    {
      text: 'Ingreso/Egreso',
      value: 'isAdjustment',
      sort: true,
    },
    {
      text: 'Estado',
      value: 'isActive',
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
      onClick: handleSetInventoryToDetails,
    },
  ];

  useEffect(() => {
    getPaginatedInventory();
  }, []);
  return (
    <Box>
      <header className={`${styles.header}`}>
        <h1 className={`${styles.title}`}>Inventario</h1>
        <div className={`${styles.saleInformationContainer}`}>
          <div className={`${styles.circle}`}></div>
        </div>
      </header>
      <section className={styles.tableActionsContainer}>
        <button className={styles.filterButton} onClick={() => setIsOpenFilter(true)}>
          <Icon fontSize={24} icon={mopsusIcons.filters}></Icon>
          Filtros
        </button>
        <button className={styles.buttonAdd} onClick={() => navigate('/nuevo-ingreso')}>Agregar inventario</button>
      </section>
      <MopsusTable
        columns={inventoryTableColumns}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        includeOptions={true}
        includePagination={false}
        isLoading={isLoading}
        options={options}
        page={null}
        rows={inventory}
        setRows={setInventory}
        totalPages={null}
      />
      {
        isOpenFilter && (
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
        )
      }

    </Box>
  );
};
