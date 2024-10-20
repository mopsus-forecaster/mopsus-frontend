import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { useState } from 'react';

export const ProductInfo = ({ product }) => {
    const { productName, price } = product;

    return (
        <div className={styles.productInfoContainer}>
            <div className={styles.productInfo}>
                <p>{productName}</p>
            </div>

            <div className={styles.priceButtonContainer}>
                <p className={styles.priceInfo}>$ {price}</p>
                <button className={styles.btn}>
                    <Icon fontSize={20} icon={mopsusIcons.plus} />
                </button>
            </div>
        </div>
    );
};