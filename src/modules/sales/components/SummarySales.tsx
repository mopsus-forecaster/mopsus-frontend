import styles from '../styles/sales.module.scss';

export const SummarySales = () => {
    return (
        <div className={styles.box}>
            <table className={styles.table}>
                <thead className={styles.headerTable}>
                    <tr>
                        <th className={styles.category}>Artículo</th>
                        <th className={styles.category}>Precio</th>
                        <th className={styles.category}>Cantidad</th>
                        <th className={styles.category}>Subtotal</th>
                        <th className={styles.category}></th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>
            <hr className={styles.line2} />
        </div>
    );
};