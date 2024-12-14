import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/sales.module.scss';
import { mopsusIcons } from '../../../icons';
import { useContext } from 'react';
import { SaleContext } from '../../../contexts/Sales/SalesContext';

export const ProductInfo = ({ producto }) => {
  const { productName, price, measureUnitDescription, stock, brand, barcode } =
    producto;
  const { addProductToSale } = useContext(SaleContext);

  return (
    <div className={styles.productInfoContainer}>
      <div className={styles.productInfo}>
        <div className={styles.info}>
          <div>
            <p className={styles.infoName}>{productName}</p>
          </div>
          <div>{barcode && <p>Codigo: {barcode}</p>}</div>
        </div>

        <p className={styles.infoUnit}>Unidad: {measureUnitDescription}</p>
        <p className={styles.infoUnit}>Stock: {stock}</p>
        <p className={styles.infoUnit}>Marca: {brand}</p>
      </div>
      <div className={styles.priceButtonContainer}>
        <p className={styles.priceInfo}>$ {price}</p>

        <button
          className={styles.btn}
          onClick={() => addProductToSale(producto)}
        >
          <Icon fontSize={20} icon={mopsusIcons.plus} />
        </button>
      </div>
    </div>
  );
};
