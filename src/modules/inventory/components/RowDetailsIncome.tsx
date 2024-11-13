import { useContext } from 'react';
import styles from '../styles/inventory.module.scss'
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { CircularProgress } from '@mui/material';

export const RowDetailsIncome = ({ details }) => {
    const { editIncome, isLoadingDetails } = useContext(InventoryContext);
    const { is_adjustment } = editIncome
    return (
        <>
            {
                isLoadingDetails ? (
                    <CircularProgress
                        className={styles.loadingSpinner}
                        sx={{
                            margin: '7.5% auto 1rem auto',
                            color: '#4a7370',
                            opacity: 100,
                        }}
                    />
                ) : details.map((product, index) => (
                    <tr key={index} className={styles.rowDetails}>
                        <div className={styles.containerData}>
                            <td className={styles.tdDetailsName}>{product.product_name}</td>
                            <p className={styles.tdDetailsCate}>Categoria: {product.category_description}</p>
                        </div>
                        <td className={styles.tdDetails}>{product.quantity} {product.unit_description}</td>
                        {
                            is_adjustment && (
                                <td>{product.is_income ? "Ingreso" : "Egreso"}</td>
                            )
                        }


                    </tr>
                ))
            }
        </>
    );
};