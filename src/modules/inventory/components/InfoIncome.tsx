import { useContext } from "react"
import { InventoryContext } from "../../../contexts/Inventory/InventoryContext"
import styles from '../styles/inventory.module.scss'

export const InfoIncome = () => {
    const { editIncome, formatId, formatDate } = useContext(InventoryContext)
    const { id, date, description } = editIncome
    return (
        <div className={styles.infoIncome}>
            <p className={styles.dataIncome}>N° {formatId(id)}</p>
            <p className={styles.dataIncome}>Fecha: {formatDate(date)}</p>
            {
                description !== '' ? (
                    <p className={styles.dataIncome}>Descripcion: {description}</p>
                ) : null
            }

        </div>
    )
}