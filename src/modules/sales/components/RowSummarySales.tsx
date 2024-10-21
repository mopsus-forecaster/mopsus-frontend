import { Icon } from '@iconify/react/dist/iconify.cjs';
import styles from '../styles/sales.module.scss'
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { createSale } from '../../../services/sales';

export const RowSummarySales = ({ product }) => {
    const { productName, price, category, quantity } = product;
    const { increaseProductQuantity, decreaseProductQuantity, removeProductFromSale } = useContext(SaleContext)
    const subtotal = price * quantity;

    return (
        <>
            <tr className={styles.row}>
                <td className={styles.category}>{productName}
                    <p className={styles.productCategory}>Categoría: {category}</p>
                </td>

                <td className={styles.category}>$ {price}</td>
                <td className={styles.category}>
                    <div>
                        <button className={styles.circleBtn} onClick={() => decreaseProductQuantity(product.id)}><Icon icon={mopsusIcons.guion} /></button>
                        {quantity}
                        <button className={styles.circleBtn} onClick={() => increaseProductQuantity(product.id)}><Icon icon={mopsusIcons.plus} /></button>
                    </div>
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