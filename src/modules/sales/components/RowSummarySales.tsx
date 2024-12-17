import { Icon } from '@iconify/react/dist/iconify.cjs';
import styles from '../styles/sales.module.scss'
import stylesInventory from '../../inventory/styles/inventory.module.scss'
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

export const RowSummarySales = ({ product }) => {
    const { productName, price, quantity, brand, measureUnitDescription } = product;
    const { removeProductFromSale, productQuantity } = useContext(SaleContext)
    const subtotal = price * quantity;


    return (
        <>
            <tr className={styles.row}>
                <td className={styles.category}>{productName}
                    <p className={styles.productCategory}>Marca: {brand}</p>
                    <p className={styles.productCategory}>Unidad: {measureUnitDescription}</p>
                </td>

                <td className={styles.category}>$ {price}</td>
                <td className={styles.category}>
                    <input
                        type="number"
                        className={stylesInventory.inputQuantity}
                        min={1}
                        defaultValue={quantity}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e') {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => productQuantity(product.id, e.target.value)}
                    />
                </td>
                <td className={styles.category}>$ {subtotal}</td>
                <td className={styles.category}>
                    <button onClick={() => removeProductFromSale(product.id)} className={styles.buttonReset}>
                        <Icon fontSize={20} icon={mopsusIcons.trash} />
                    </button>
                </td>

            </tr >
        </>

    );
};