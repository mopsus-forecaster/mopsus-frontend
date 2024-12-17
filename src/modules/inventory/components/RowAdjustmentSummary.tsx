import styles from '../styles/inventory.module.scss';
import { Icon } from '@iconify/react/dist/iconify.cjs';
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';
import { InventoryContext } from '../../../contexts/Inventory/InventoryContext';

export const RowAdjustmentSummary = ({ product }) => {
  const { productName, category, measureUnitDescription, id, quantity, is_income } = product;
  const { removeProductFromSale, productQuantity, productAdjustment } =
    useContext(SaleContext);

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.productName}>
          <div>
            {productName}
          </div>
          <div>
            {product.barcode && (
              <p className={styles.tdDetailsCate}>
                <Icon fontSize={20} icon={mopsusIcons.barcode} /> {product.barcode}
              </p>
            )}
          </div>
          <p className={styles.productCategory}>Categoría: {category}</p>
        </td>

        <td className={styles.category}>{measureUnitDescription}</td>
        <td className={styles.category}>
          <input
            type="number"
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            className={styles.inputQuantity}
            min={1}
            defaultValue={quantity}
            onChange={(e) => productQuantity(id, e.target.value)}
          />
        </td>
        <td className={styles.category}>
          <select
            className={styles.selectFilterAdjustment}
            defaultValue={is_income}
            onChange={(e) => productAdjustment(id, e.target.value)}
          >
            <option value="">Seleccione una opcion</option>
            <option value="1">Ingreso</option>
            <option value="0">Egreso</option>
          </select>
        </td>
        <td className={styles.category}>
          <button
            onClick={() => removeProductFromSale(product.id)}
            className={styles.buttonReset}
          >
            <Icon fontSize={20} icon={mopsusIcons.trash} />
          </button>
        </td>
      </tr>
    </>
  );
};
