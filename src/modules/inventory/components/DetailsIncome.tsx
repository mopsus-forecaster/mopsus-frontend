import { useContext, useEffect } from 'react';
import styles from '../styles/inventory.module.scss';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { RowDetailsIncome } from './RowDetailsIncome';
import { CircularProgress } from '@mui/material';

export const DetailsIncome = () => {
  const {
    editIncome,
    isLoadingDetails,
    formatDate,
    formatId
  } = useContext(InventoryContext);


  const { date_receipt, description, is_adjustment, receipt_number, id, date } = editIncome || {};

  useEffect(() => {
  }, [editIncome,])
  return (
    <section className={styles.boxInventoryProducts}>
      <header>
        <div className={styles.contentBoxInventory}>
          <p className={styles.titleBoxInventory}>
            Detalle del ingreso o egreso
          </p>
          <hr className={styles.line2} />
        </div>
      </header>
      <section>
        {editIncome && (
          <div className={styles.infoIncome}>

            <p className={styles.dataIncome}>N° &nbsp;{receipt_number ? receipt_number : formatId(id)}</p>
            <p className={styles.dataIncome}>
              Fecha:&nbsp;&nbsp;{date_receipt ? formatDate(date_receipt) : formatDate(date)}
            </p>
            {description && (
              <p className={styles.dataIncome}>
                Descripción: &nbsp;{description}
              </p>
            )}
          </div>
        )

        }

      </section>
      <div className={styles.contentBoxInventory}>
        <hr className={styles.line2} />
      </div>
      <section>
        <div className={styles.tableContainerIcomesArticulos}>
          <div className={styles.scrollContainerIncomesArticulos}>
            <table className={styles.tableIcomesArituculos}>
              <thead className={styles.theadIcomes}>
                <tr className={styles.trIcomes}>
                  <th className={styles.thIcomesArticulo}>Artículo</th>
                  <th className={styles.thIcomesArticulo}>Cantidad</th>
                  <th className={styles.thIcomesArticulo}>Precio (ARS)</th>
                  {is_adjustment && (
                    <th className={styles.thIcomesArticulo}>Ingreso/Egreso</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isLoadingDetails ? (
                  <CircularProgress
                    className={styles.loadingSpinner}
                    sx={{
                      margin: '7.5% auto 1rem auto',
                      color: '#4a7370',
                      opacity: 100,
                    }}
                  />
                ) : editIncome && editIncome.details.length > 0 ? (
                  <RowDetailsIncome details={editIncome.details} />
                ) : (
                  <tr>
                    <td className={styles.productListEmptyContainer}>
                      {editIncome
                        ? 'Sin detalles disponibles'
                        : 'Seleccione algún ingreso/egreso para ver su detalle'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};
