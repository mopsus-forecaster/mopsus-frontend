import { Icon } from '@iconify/react/dist/iconify.js';
import { mopsusIcons } from '../../../icons';
import styles from '../styles/sales.module.scss'
import { RowSaleDetails } from './RowSaleDetails';


export const SaleDetails = ({ saleDetails, handleSetSaleToDetails }) => {
    const { saleDate, products, discount, total } = saleDetails
    const subtotal = products.reduce((acc, product) => acc + (product.historic_price * product.quantity), 0);



    return (
        <div className={styles.modal}>
            <div className={styles.detailsContainer}>
                <div className={styles.modalContents}>
                    <header className={styles.headerDetails}>
                        <section>
                            <div className={styles.title}>
                                Detalle de ventas
                            </div>
                            <div >
                                {saleDate}
                            </div>
                        </section>
                        <section>
                            <Icon
                                fontSize={25}
                                icon={mopsusIcons.closeModal}
                                className={styles.iconClose}
                                onClick={() => handleSetSaleToDetails()}
                            />
                        </section>
                    </header>
                    <div className={styles.listSales}>
                        <table className={styles.tableSaleDetails}>
                            <thead className={styles.theadSaleDetails}>
                                <tr>
                                    <th className={styles.thSaleDetails}>Producto</th>
                                    <th className={styles.thSaleDetails}>Precio</th>
                                    <th className={styles.thSaleDetails}>Cantidad</th>
                                    <th className={styles.thSaleDetails}>Unidad</th>
                                    <th className={styles.thSaleDetails}>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products && products.length > 0 ? (
                                    products.map((product, index) => (
                                        <RowSaleDetails key={index} product={product} />
                                    ))
                                ) : (
                                    <tr>
                                        <td className={styles.productListEmptyContainer}>
                                            No se encontraron productos.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>
                    <div className={styles.boxResults}>
                        <div className={styles.results}>
                            <p className={styles.infoResults}>Subtotal</p>
                            <p className={styles.infoResults}>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className={`${styles.results} ${styles.resultsGris}`}>
                            <p className={styles.infoResults}>Descuento</p>
                            <p className={styles.infoResults}>{discount}</p>
                        </div>
                        <div className={`${styles.results} ${styles.resultsGris}`}>
                            <p className={styles.infoResults} >Total</p>
                            <p className={styles.infoResults}>${total}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};