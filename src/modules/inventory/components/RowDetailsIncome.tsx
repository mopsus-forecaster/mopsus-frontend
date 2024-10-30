import styles from '../styles/inventory.module.scss'

export const RowDetailsIncome = ({ details }) => {
    return (
        <>
            {details.map((product, index) => (
                <tr key={index} className={styles.rowDetails}>
                    <div className={styles.containerData}>
                        <td className={styles.tdDetailsName}>{product.product_name}</td>
                        <p className={styles.tdDetailsCate}>Categoria: {product.category_description}</p>
                    </div>
                    <td className={styles.tdDetails}>{product.quantity} {product.unit_description}</td>
                </tr>
            ))}
        </>
    );
};