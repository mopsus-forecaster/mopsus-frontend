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
import { LoadingContext } from '../../../contexts/loading/LoadingContext';

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

  if (!form.category) {
    errors.category = 'El stock actual es requerido';
  }

  if (!form.unit) {
    errors.unit = 'El stock actual es requerido';
  }

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
  const { setShowLoading } = useContext(LoadingContext);

  const { form, errors, handleChange } = useForm<FormData>(
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
      setShowLoading(true);
      const res = await addProduct(
        form.title,
        form.price,
        form.reposition_point,
        form.stock,
        form.unit,
        form.category
      );

      if (res) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              onClose();
              getProducts();
            },
          },
          title: 'Producto registrado con éxito',
          message: 'Podrá ver el producto registrado en la tabla',
        });
        handleOpen();
      }
    } catch ({ errors }) {
      setShowLoading(false);
      switch (errors[0].status) {
        case 400:
          handleModalChange({
            accept: {
              title: 'Aceptar',
              action: () => {},
            },
            title: 'Error en el registro',
            message: 'Ya existe un producto con dicho nombre.',
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
  };

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);

      try {
        await Promise.all([getCategoriesOptions(), getUnitsOptions()]);
      } catch (error) {
        console.error(error);
      } finally {
        setShowLoading(false);
      }
    };

    const getCategoriesOptions = async () => {
      try {
        const { categorias } = await getCategories();
        if (categorias) {
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
          setUnits(unidades);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
          <h2 className={styles.titleRegister}>Registrar Producto</h2>
          <hr className={styles.line} />
          <form onSubmit={onSubmit}>
            <div>
              <div>
                <label htmlFor="category" className={styles.modalLabel}>
                  Categorías
                </label>
                <select
                  onChange={handleChange}
                  value={form.category}
                  name="category"
                  id="category"
                  className={styles.select}
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.length > 0 ? (
                    categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
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
                <label htmlFor="unit" className={styles.modalLabel}>
                  Unidades
                </label>
                <select
                  name="unit"
                  id="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="" disabled>
                    Selecciona una unidad
                  </option>
                  {units.length > 0 ? (
                    units.map((unit) => (
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
                <label htmlFor="title" className={styles.modalLabel}>
                  Nombre del producto
                </label>
                <input
                  type="text"
                  name="title"
                  className={styles.modalInput}
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                {errors.title && <p className={styles.error}>{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="price" className={styles.modalLabel}>
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
                  required
                />
                {errors.price && <p className={styles.error}>{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="reposition_point" className={styles.modalLabel}>
                  Punto de reposición
                </label>
                <input
                  type="number"
                  name="reposition_point"
                  className={styles.modalInput}
                  min="0"
                  value={form.reposition_point}
                  onChange={handleChange}
                  required
                />
                {errors.reposition_point && (
                  <p className={styles.error}>{errors.reposition_point}</p>
                )}
              </div>

              <div>
                <label htmlFor="stock" className={styles.modalLabel}>
                  Stock actual
                </label>
                <input
                  type="number"
                  name="stock"
                  className={styles.modalInput}
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
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
