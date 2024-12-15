import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../../../shared/mopsusTable/styles/table.module.scss';
import { useContext } from 'react';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
export const MapInventoryTable = (income) => {
    const {
        handleSetIncomeToEdit,
        deleteIncomeFromTable,
        formatId,
        formatDate
    } = useContext(InventoryContext);
    console.log(income)
    const detailsIncome = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.details}
            onClick={() => {
                handleSetIncomeToEdit(income);
            }}
        />
    );

    const deleteProduct = (
        <Icon
            className={styles.icon}
            style={{ color: '#ffff', fontSize: '1.2rem' }}
            icon={mopsusIcons.trash}
            onClick={() => {
                deleteIncomeFromTable(income);
            }}
        />
    );


    const options = (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
            }}
        >
            {detailsIncome}
            {income.isActive === 'Activo' && deleteProduct}
        </div>
    );

    return {
        formatId: formatId(income.id),
        date: formatDate(income.dateReceipt || income.date),
        description: income.description || 'Sin descripción',
        isActive: income.isActive === 'Activo' ? 'Activo' : 'Inactivo',
        isAdjustment: income.isAdjustment,
        receiptNumber: income.receiptNumber || '-',
        options,
    };
};
