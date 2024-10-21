import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

export const ProductInfo = ({ product }) => {
    const { productName, price } = product;
    const { addProductToSale } = useContext(SaleContext)


    return (
        <div className={styles.productInfoContainer}>
            <div className={styles.productInfo}>
                <p>{productName}</p>
            </div>
            <div className={styles.priceButtonContainer}>
                <p className={styles.priceInfo}>$ {price}</p>
                <button className={styles.btn} onClick={() => addProductToSale(product)}>
                    <Icon fontSize={20} icon={mopsusIcons.plus} />
                </button>
            </div>
        </div>
    );
};