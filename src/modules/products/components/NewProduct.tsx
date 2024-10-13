import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';

export const NewProduct = ({ isOpenNewProduct, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.registerContainer}>
        <div className={styles.modalContents}>
          <Icon fontSize={25} icon={mopsusIcons.closeModal} className={styles.iconClose} onClick={onClose} />
          <div>
            <h2 className={styles.titleRegister}>Registrar Producto</h2>
            <hr className={styles.line} />
            <form action="">
              <div>
                <div>
                  <label htmlFor="" className={styles.modalLabel}>Nombre del producto</label>
                  <input type="text" className={styles.modalInput} />
                </div>
                <div>
                  <label htmlFor="" className={styles.modalLabel}>Precio de venta</label>
                  <input type="number" id="price" name="price" min="0" step="0.01" placeholder="0.00" className={styles.modalInput} />
                </div>
                <div>
                  <label htmlFor="" className={styles.modalLabel}>Punto de reposición</label>
                  <input type="number" min={0} placeholder='0' className={styles.modalInput} />
                </div>
                <div>
                  <label htmlFor="" className={styles.modalLabel}>Stock actual</label>
                  <input type="number" min={0} placeholder='0' className={styles.modalInput} />
                </div>
                <div className={styles.btnBox}>
                  <button type='submit' className={`${styles.btn} ${styles.btnRegister}`}>Registrar Producto</button>
                  <button type='button' className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};