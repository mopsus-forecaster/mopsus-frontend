import { useContext } from 'react'
import styles from '../styles/inventory.module.scss'
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext'
import { RowDetailsIncome } from './RowDetailsIncome'

export const DetailsIncome = () => {
    const { editIncome, formatId, formatDate } = useContext(InventoryContext)
    const { id, date, description } = editIncome || {} // Desestructurando editIncome o dejando vacío

    return (
        <section className={styles.boxInventoryProducts}>
            <header>
                <div className={styles.contentBoxInventory}>
                    <p className={styles.titleBoxInventory}>Detalle del ingreso o egreso</p>
                    <hr className={styles.line} />
                </div>
            </header>
            <section>
                <div className={styles.infoIncome}>
                    <p className={styles.dataIncome}>N° &nbsp;{id ? formatId(id) : ""}</p>
                    <p className={styles.dataIncome}>Fecha:&nbsp;&nbsp;{date ? formatDate(date) : ""}</p>
                    {description ? (
                        <p className={styles.dataIncome}>Descripción: &nbsp;{description}</p>
                    ) : null}
                </div>
            </section>
            <div className={styles.contentBoxInventory}>
                <hr className={styles.line} />
            </div>
            <section>
                <div className={styles.tableContainerIcomesArticulos}>
                    <div className={styles.scrollContainerIncomesArticulos}>
                        <table className={styles.tableIcomesArituculos}>
                            <thead className={styles.theadIcomes}>
                                <tr className={styles.trIcomes}>
                                    <th className={styles.thIcomesArticulo}>Artículo</th>
                                    <th className={styles.thIcomesArticulo}>Cantidad</th>
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
    )
}
