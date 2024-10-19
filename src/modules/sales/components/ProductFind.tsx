import { useContext } from 'react';
import styles from '../styles/sales.module.scss';
import { ProductInfo } from './ProductInfo';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';

export const ProductFind = () => {

    const {
        mappedProducts,
        isLoading,
    } = useContext(ProductsContext)

    return (
        <div className={styles.box}>
            <header>
                <div className={styles.contentBox}>
                    <p className={styles.titleBox}>Productos Encontrados</p>
                    <hr className={styles.line} />
                </div>
            </header>
            <div className={styles.contentBox}>
                {isLoading ? (
                    <p>Cargando productos...</p>
                ) : mappedProducts && mappedProducts.length > 0 ? (
                    <div className={styles.productListContainer}>
                        {mappedProducts.map((product, index) => (
                            <ProductInfo key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>No se encontraron productos</p>
                )}
            </div>
        </div>
    );
};
