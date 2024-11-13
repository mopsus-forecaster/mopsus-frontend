import { useContext } from 'react';
import styles from '../styles/inventory.module.scss';
import { ProductInfo } from './ProductInfo';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { CircularProgress } from '@mui/material';

export const ProductFind = () => {
    const { mappedProducts, isLoading } = useContext(ProductsContext);

    return (
        <div className={styles.box}>
            <header>
                <div className={styles.contentBox}>
                    <p className={styles.titleBox}>Productos Encontrados</p>
                    <hr className={styles.line2} />
                </div>
            </header>
            <div className={styles.contentBox}>
                {isLoading ? (
                    <CircularProgress
                        className={styles.loadingSpinner}
                        sx={{
                            margin: '7.5% auto 1rem auto',
                            color: '#4a7370',
                            opacity: 100,
                        }}
                    />
                ) : mappedProducts && mappedProducts.length > 0 ? (
                    <div className={styles.productListContainer}>
                        {mappedProducts.map((producto, index) => (
                            <ProductInfo key={index} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <tr>
                        <td className={styles.productListEmptyContainer}>
                            No se encontraron productos.
                        </td>
                    </tr>
                )}
            </div>
        </div>
    );
};
