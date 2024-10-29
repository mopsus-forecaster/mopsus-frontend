import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/inventory.module.scss';
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

export const ProductInfo = ({ producto }) => {
    const { productName, measureUnitDescription } = producto;
    const { addProductToSale } = useContext(SaleContext)


    return (
        <div className={styles.productInfoContainer}>
            <div className={styles.productInfo}>
                <p className={styles.infoName}>{productName}</p>
                <p className={styles.infoUnit}>Unidad: {measureUnitDescription}</p>
            </div>
            <div className={styles.priceButtonContainer}>
                <button className={styles.btn} onClick={() => addProductToSale(producto)}>
                    <Icon fontSize={20} icon={mopsusIcons.plus} />
                </button>
            </div>
        </div>
    );
};