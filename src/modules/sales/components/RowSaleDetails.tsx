import { useContext, useEffect } from 'react';
import styles from '../styles/sales.module.scss';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';

export const RowSaleDetails = ({ product }) => {
    const { product_id, historic_price, quantity } = product;
    const { getProductsAll, mappedProducts, setFilters, filters } = useContext(ProductsContext);
    const { productName, measureUnitDescription } = mappedProducts.find(item => item.id === product_id) || {};
    const total = historic_price * quantity;


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters((prevFilters) => ({ ...prevFilters, id: product_id, page: null }));
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [product_id]);

    useEffect(() => {
        getProductsAll();
    }, [filters]);
    return (
        <>
            <tr className={styles.trSaleDetails}>
                <td className={styles.tdSaleDetails}>{productName}</td>
                <td className={styles.tdSaleDetails}>$ {historic_price}</td>
                <td className={styles.tdSaleDetails}>{quantity}</td>
                <td className={styles.tdSaleDetails}>{measureUnitDescription}</td>
                <td className={styles.tdSaleDetails}>$ {total}</td>
            </tr>
        </>

    );
}