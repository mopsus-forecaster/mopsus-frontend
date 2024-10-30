import Box from '../../../shared/box';
import styles from '../styles/inventory.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Filter } from '../../../shared/filter';
import { useContext, useEffect, useState } from 'react';
import { InventoryFilter } from '../components/IntentoryFilter';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { RowIncomes } from '../components/RowIncomes';
import { CircularProgress } from '@mui/material';
import { RowDetailsIncome } from '../components/RowDetailsIncome';
import { DetailsIncome } from '../components/DetailsIncome';



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
    incomes,
    setInventory,
    getPaginatedInventory,
    handleSetInventoryToDetails,
  } = useContext(InventoryContext)

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
        <div className={styles.tableSearchComponent}>
          <input
            className={styles.tableSearchInput}
            placeholder="Buscar por id..."
            type="text"
          />
          <button className={styles.filterButton} onClick={() => setIsOpenFilter(true)}>
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
          <div className={styles.tableContainerIcomes}>
            <div className={styles.scrollContainerIncomes}>
              <table className={styles.tableIcomes}>
                <thead className={styles.theadIcomes}>
                  <tr className={styles.trIcomes}>
                    <th className={styles.thIcomes}>N°</th>
                    <th className={styles.thIcomes}>Fecha</th>
                    <th className={styles.thIcomes}>Estado</th>
                    <th className={styles.thIcomes}>Ingreso/Egreso</th>
                    <th className={styles.thIcomes}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td className={styles.loadingSpinner}>
                        <CircularProgress
                          sx={{
                            margin: '7.5% auto 1rem auto',
                            color: '#4a7370',
                            opacity: 100,
                          }}
                        />
                      </td>
                    </tr>
                  ) : incomes && incomes.length > 0 ? (
                    incomes.map((inventory, index) => (
                      <RowIncomes key={index} income={inventory} />
                    ))
                  ) : (
                    <tr>
                      <td className={styles.productListEmptyContainer}>
                        No se encontraron Ingresos o Egresos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <DetailsIncome />
      </div>

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
