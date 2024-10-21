import { useContext, useEffect, useState } from 'react';
import styles from '../styles/sales.module.scss';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { RowSummarySales } from './RowSummarySales';
import { createSale } from '../../../services/sales';

export const SummarySales = () => {
    const { addProduct } = useContext(SaleContext);
    const [discount, setDiscount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createSale(
                addProduct,
                discount,
            )
            console.log('Venta registrada:', res);
        } catch (error) {
            console.error('no funcina' + error)
        }

    }

    useEffect(() => {
        const newSubTotal = addProduct.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        setSubTotal(newSubTotal);

        const newTotal = newSubTotal - (newSubTotal * discount);
        setTotal(newTotal);
    }, [addProduct, discount]);
    return (
        <div className={styles.boxTableResumen}>
            <div className={styles.tableContainer}>
                <div className={styles.scrollContainer}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.category}>Artículo</th>
                                <th className={styles.category}>Precio</th>
                                <th className={styles.category}>Cantidad</th>
                                <th className={styles.category}>Subtotal</th>
                                <th className={styles.category}></th>
                            </tr>
                        </thead>
                        <tbody>

                            {addProduct && addProduct.length > 0 ? (
                                addProduct.map((product) => (
                                    <RowSummarySales key={product.id} product={product} />
                                ))

                            ) : (
                                <p>No hay productos en el carrito.</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.resumenContainer}>
                <div>
                    <p className={styles.p1}>Resumen</p>
                    <hr className={styles.lineResumen} />
                </div>
                <div>
                    <div className={styles.resumenContent}>
                        <p className={styles.p}>Subtotal</p>
                        <p className={styles.p}>{subTotal}</p>
                    </div>

                    <hr className={styles.lineResumen} />
                </div>

                <div>
                    <div className={styles.resumenContent}>
                        <p className={styles.p}>Descuento</p>
                        <input type="number" onChange={(e) => setDiscount(e.target.value / 100)} className={styles.inputDesc} />
                    </div>
                    <hr className={styles.lineResumen} />
                </div>
                <div>
                    <div className={styles.resumenContent}>
                        <p className={styles.p}>Total</p>
                        <p className={styles.p}>{total}</p>
                    </div>
                </div>
                <div >
                    <button className={styles.buttonRegsiter} onClick={onSubmit}>Registrar Venta</button>
                </div>
            </div>
        </div>

    );
};