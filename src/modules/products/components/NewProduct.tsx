import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useForm } from '../../../Hooks/useForm';
import { useContext, useState } from 'react';
import Modal from '../../../shared/modal';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import routes from '../../../router/routes';

interface FormData {
  nombreProducto: string;
  precioVenta: string;
  puntoReposicion: string;
  stockActual: string;
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
};

export const NewProduct = ({ isOpenNewProduct, onClose }) => {
  const [registrado, setRegistrado] = useState(false);
  //const { handleOpen, handleModalChange } = useContext(ModalContext)
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      nombreProducto: '',
      precioVenta: '',
      puntoReposicion: '',
      stockActual: '',
    },
    validateForm
  );

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(() => {
      /* try {
        const res = await addProduct()
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

      } */
      console.log('Producto registrado', JSON.stringify(form));
      setRegistrado(true);
    });
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
                <Modal
                  show={true}
                  title="Éxito"
                  accept={{
                    title: 'Aceptar',
                    action: () => { },
                  }}
                  message="Producto registrado con éxito"
                  handleClose={() => {
                    setRegistrado(false);
                  }}
                  icon={mopsusIcons.circleCheck}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
