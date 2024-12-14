import { useContext } from 'react';
import styles from '../styles/inventory.module.scss';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';
import { Icon } from '@iconify/react/dist/iconify.cjs';
import { mopsusIcons } from '../../../icons';

export const RowDetailsIncome = ({ details }) => {
  const { editIncome } = useContext(InventoryContext);
  const { is_adjustment } = editIncome;
  return details.map((product, index) => (
    <tr key={index} className={styles.rowDetails}>
      <div className={styles.containerData}>
        <td className={styles.tdDetailsName}>{product.product_name}</td>
        <p className={styles.tdDetailsCate}>
          Categoria: {product.category_description}
        </p>
        {product.barcode && (
          <p className={styles.tdDetailsCate}>
            <Icon fontSize={20} icon={mopsusIcons.barcode} /> {product.barcode}
          </p>
        )}

      </div>
      <td className={styles.tdDetails}>
        {product.quantity} {product.unit_description}
      </td>
      <td className={styles.tdDetails}>
        {product.price}
      </td>
      {is_adjustment && <td>{product.is_income ? 'Ingreso' : 'Egreso'}</td>}
    </tr>
  ));
};
