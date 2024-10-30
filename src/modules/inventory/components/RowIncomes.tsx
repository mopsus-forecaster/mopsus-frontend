import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "../styles/inventory.module.scss";
import { mopsusIcons } from "../../../icons";
import { useContext } from "react";
import { InventoryContext } from "../../../contexts/Inventory/InventoryContext";

export const RowIncomes = ({ income }) => {
    const { id, date, isActive, isAdjustment } = income;
    const { deleteIncomeFromTable, formatId, handleSetIncomeToEdit } = useContext(InventoryContext)

    return (
        <tr className={styles.rowIncomes}>
            <td className={styles.tdIcomes}>
                {formatId(id)}
            </td>
            <td className={styles.tdIcomes}>
                {date}
            </td>
            <td className={styles.tdIcomes}>
                {isActive}
            </td>
            <td className={styles.tdIcomes}>
                {isAdjustment}
            </td>
            <td className={styles.tdIcons}>
                <Icon fontSize={20} icon={mopsusIcons.details} onClick={() => handleSetIncomeToEdit(id)} />
                <Icon fontSize={20} icon={mopsusIcons.trash} onClick={() => deleteIncomeFromTable(id)} />
            </td>
        </tr>
    );
};
