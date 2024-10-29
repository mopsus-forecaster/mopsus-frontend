import styles from '../styles/inventory.module.scss'
import { Icon } from '@iconify/react/dist/iconify.cjs';
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

export const RowInventorySummary = ({ product }) => {
    const { productName, category, measureUnitDescription, id } = product;
    const { removeProductFromSale, productQuantity } = useContext(SaleContext)
    return (
        <>
            <tr className={styles.row}>
                <td className={styles.productName}>{productName}
                    <p className={styles.productCategory}>Categoría: {category}</p>
                </td>

                <td className={styles.category}>{measureUnitDescription}</td>
                <td className={styles.category}>
                    <input type="number" className={styles.inputQuantity} min={1} defaultValue={1} onChange={(e) => productQuantity(id, e.target.value)} />
                </td>
                <td className={styles.category}>
                    <button onClick={() => removeProductFromSale(product.id)} className={styles.buttonReset}>
                        <Icon fontSize={20} icon={mopsusIcons.trash} />
                    </button>
                </td>

            </tr >
        </>

    );
}