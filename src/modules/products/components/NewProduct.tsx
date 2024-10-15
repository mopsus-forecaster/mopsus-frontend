import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useForm } from '../../../Hooks/useForm';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import routes from '../../../router/routes';
import { addProduct } from '../../../services/products';

interface FormData {
  title: string;
  price: number | string;
  reposition_point: number | string;
  stock: number | string;
}

const validateForm = (form: FormData) => {
  const errors: Partial<FormData> = {};

  if (!form.title) {
    errors.title = 'El nombre del producto es requerido';
  }

  if (!form.price) {
    errors.price = 'El precio de venta es requerido';
  }

  if (!form.reposition_point) {
    errors.reposition_point = 'El punto de reposición es requerido';
  }

  if (!form.stock) {
    errors.stock = 'El stock actual es requerido';
  }

  return errors;
};

export const NewProduct = ({ isOpenNewProduct, onClose }) => {
  const { handleOpen, handleModalChange } = useContext(ModalContext)
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      title: '',
      price: '',
      reposition_point: '',
      stock: ''
    },
    validateForm
  );

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct(form.title, form.price, form.reposition_point, form.stock)
      if (res) {
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => { navigate(`/${routes.products}`) },
          },
          title: 'Producto registrado con éxito',
          message: 'Prodra ver el producto registrado en la tabla',
          icon: mopsusIcons.error,
        });
        handleOpen();
      }
    } catch (error) {
      switch (errors[0].status) {
        case 400:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => { },
            },
            title: 'Error en los campos',
            message: 'Usuario y/o contraseña incorrectos.',
            icon: mopsusIcons.error,
          });
          handleOpen();
          break;
        default:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => { },
            },
            title: 'Error técnico',
            message:
              'Lo sentimos, no pudimos completar su solicitud. Intente más tarde',
            icon: mopsusIcons.error,
          });
          handleOpen();

          break;
      }

    }
    console.log('Producto registrado', JSON.stringify(form));
  };

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
                    name="title"
                    className={styles.modalInput}
                    value={form.title}
                    onChange={handleChange}
                  />
                  {errors.title && <p className={styles.error}>{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Precio de venta</label>
                  <input
                    type="number"
                    name="price"
                    className={styles.modalInput}
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                  />
                  {errors.price && <p className={styles.error}>{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Punto de reposición</label>
                  <input
                    type="number"
                    name="reposition_point"
                    className={styles.modalInput}
                    min="0"
                    value={form.reposition_point}
                    onChange={handleChange}
                  />
                  {errors.reposition_point && <p className={styles.error}>{errors.reposition_point}</p>}
                </div>

                <div>
                  <label htmlFor="" className={styles.modalLabel}>Stock actual</label>
                  <input
                    type="number"
                    name="stock"
                    className={styles.modalInput}
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                  />
                  {errors.stock && <p className={styles.error}>{errors.stock}</p>}
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
