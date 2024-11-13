import { useContext, useEffect } from 'react';
import styles from '../styles/inventory.module.scss';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { RowDetailsIncome } from './RowDetailsIncome';

export const DetailsIncome = () => {
    const { editIncome, formatDate, formatId } = useContext(InventoryContext);
    const { id, date, description, is_adjustment } = editIncome || {};

    useEffect(() => { }, [editIncome]);

    return (
        <section className={styles.boxInventoryProducts}>
            <header>
                <div className={styles.contentBoxInventory}>
                    <p className={styles.titleBoxInventory}>Detalle del ingreso o egreso</p>
                    <hr className={styles.line2} />
                </div>
            </header>
            <section>
                <div className={styles.infoIncome}>
                    <p className={styles.dataIncome}>N° &nbsp;{id ? formatId(id) : ""}</p>
                    <p className={styles.dataIncome}>Fecha:&nbsp;&nbsp;{date ? formatDate(date) : ""}</p>
                    {description && (
                        <p className={styles.dataIncome}>Descripción: &nbsp;{description}</p>
                    )}
                </div>
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
                                    {
                                        is_adjustment && (
                                            <th className={styles.thIcomesArticulo}>Ingreso/Egreso</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {editIncome && editIncome.details.length > 0 ? (
                                    <RowDetailsIncome details={editIncome.details} />
                                ) : (
                                    <tr>
                                        <td className={styles.productListEmptyContainer}>
                                            {editIncome ? "Sin detalles disponibles" : "Seleccione algún ingreso/egreso para ver su detalle"}
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
