import { Icon } from '@iconify/react/dist/iconify.js';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useForm } from '../../../hooks/useForm';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import {
  addProduct,
  getCategories,
  getUnits,
} from '../../../services/products';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';

interface FormData {
  title: string;
  price: number | string;
  reposition_point: number | string;
  stock: number | string;
  category: string;
  unit: string;
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
  const { getProducts } = useContext(ProductsContext);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>(
    {
      title: '',
      price: '',
      reposition_point: '',
      stock: '',
      category: '',
      unit: '',
    },
    validateForm
  );

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct(
        form.title,
        form.price,
        form.reposition_point,
        form.stock,
        form.unit,
        form.category
      );

      if (res) {
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              onClose();
              getProducts();
            },
          },
          title: 'Producto registrado con éxito',
          message: 'Prodra ver el producto registrado en la tabla',
        });
        handleOpen();
      }
    } catch ({ errors }) {
      switch (errors[0].status) {
        case 400:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {},
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
              action: () => {},
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

  useEffect(() => {
    const getCategoriesOptions = async () => {
      try {
        const { categorias } = await getCategories();
        if (categorias) {
          console.log(categorias);
          setCategories(categorias);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getUnitsOptions = async () => {
      try {
        const { unidades } = await getUnits();
        if (unidades) {
          console.log(unidades);
          setUnits(unidades);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategoriesOptions();
    getUnitsOptions();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.registerContainer}>
        <div className={styles.modalContents}>
          <Icon
            fontSize={25}
            icon={mopsusIcons.closeModal}
            className={styles.iconClose}
            onClick={onClose}
          />
          <div></div>
          <h2 className={styles.titleRegister}>Registrar Producto</h2>
          <hr className={styles.line} />
          <form onSubmit={onSubmit}>
            <div>
              <div>
                <label htmlFor="" className={styles.modalLabel}>Categorias</label>
                <select onChange={handleChange} value={form.category} name="category" id="category" className={styles.select}>
                  <option value="" disabled selected>Selecciona una categoría</option>
                  {categories && categories.length > 0
                    ? categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} - {c.description}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay categorías disponibles
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="" className={styles.modalLabel}>Unidades</label>
                <select name="unit" id="unit" value={form.unit} onChange={handleChange} className={styles.select}>
                  <option value="" disabled >Selecciona una unidad</option>
                  {units && units.length > 0
                    ? units.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} - {unit.description}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No hay unidades disponibles
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="" className={styles.modalLabel}>
                  Nombre del producto
                </label>
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
                <label htmlFor="" className={styles.modalLabel}>
                  Precio de venta
                </label>
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
                <label htmlFor="" className={styles.modalLabel}>
                  Punto de reposición
                </label>
                <input
                  type="number"
                  name="reposition_point"
                  className={styles.modalInput}
                  min="0"
                  value={form.reposition_point}
                  onChange={handleChange}
                />
                {errors.reposition_point && (
                  <p className={styles.error}>{errors.reposition_point}</p>
                )}
              </div>

              <div>
                <label htmlFor="" className={styles.modalLabel}>
                  Stock actual
                </label>
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
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnRegister}`}
                >
                  Registrar Producto
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnCancel}`}
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
