import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useForm } from '../../../Hooks/useForm';
import { useState } from 'react';

interface FormData {
  nombreProducto: string;
  precioVenta: string,
  puntoReposicion: string,
  stockActual: string
}


const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};

  if (!form.nombreProducto) {
    errors.nombreProducto = 'El nombre del producto es requerido';
  }

  if (!form.precioVenta) {
    errors.precioVenta = 'El precio de venta es requerido';
  }

  if (!form.puntoReposicion) {
    errors.puntoReposicion = 'El punto de reposición es requerido';
  }

  if (!form.stockActual) {
    errors.stockActual = 'El stock actual es requerido';
  }

  return errors;
}


export const NewProduct = ({ isOpenNewProduct, onClose }) => {
  const [registrado, setRegistrado] = useState(false)
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      nombreProducto: '',
      precioVenta: '',
      puntoReposicion: '',
      stockActual: '',
    },
    validateForm
  )


  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(() => {
      //back
      console.log('Producto registrado', JSON.stringify(form))
      setRegistrado(true)
    })
  }
  return (
    <div className={styles.modal}>
      <div className={styles.registerContainer}>
        <div className={styles.modalContents}>
          <Icon fontSize={25} icon={mopsusIcons.closeModal} className={styles.iconClose} onClick={onClose} />
          <div>
            <h2 className={styles.titleRegister}>Registrar Producto</h2>
            <hr className={styles.line} />
            <form onSubmit={onSubmit}>
              <div>
                <div>
                  <label htmlFor="" className={styles.modalLabel}>Nombre del producto</label>
                  <input
                    type="text"
                    name="nombreProducto"
                    className={styles.modalInput}
                    value={form.nombreProducto}
                    onChange={handleChange}
                  />
                  {errors.nombreProducto && <p className={styles.error}>{errors.nombreProducto}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Precio de venta</label>
                  <input
                    type="number"
                    name="precioVenta"
                    className={styles.modalInput}
                    min="0"
                    step="0.01"
                    value={form.precioVenta}
                    onChange={handleChange}
                  />
                  {errors.precioVenta && <p className={styles.error}>{errors.precioVenta}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Punto de reposición</label>
                  <input
                    type="number"
                    name="puntoReposicion"
                    className={styles.modalInput}
                    min="0"
                    value={form.puntoReposicion}
                    onChange={handleChange}
                  />
                  {errors.puntoReposicion && <p className={styles.error}>{errors.puntoReposicion}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Stock actual</label>
                  <input
                    type="number"
                    name="stockActual"
                    className={styles.modalInput}
                    min="0"
                    value={form.stockActual}
                    onChange={handleChange}
                  />
                  {errors.stockActual && <p className={styles.error}>{errors.stockActual}</p>}
                </div>

                <div className={styles.btnBox}>
                  <button type='submit' className={`${styles.btn} ${styles.btnRegister}`}>Registrar Producto</button>
                  <button type='button' className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>Cancelar</button>
                </div>
              </div>
            </form>
            {
              registrado && (
                <div className={styles.modalExito}>
                  <div>
                    <p>¡Producto registrado con exito!</p>
                  </div>
                </div>

              )
            }
          </div>
        </div>
      </div>
    </div>

  );
};