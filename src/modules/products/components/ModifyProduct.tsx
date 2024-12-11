import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useForm } from '../../../hooks';
import {
  getCategories,
  getUnits,
  onEditProduct,
} from '../../../services/products';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import Box from '../../../shared/box';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';
import { TablelSelect } from './TableSelect';
import { useNavigate } from 'react-router-dom';

interface FormData {
  title: string;
  price: number | string;
  reposition_point: number | string;
  stock: number | string;
  category: string;
  unit: string;
  brand: string;
  barcode: string;
}

export const ModifyProduct = () => {
  const { getProducts, editProduct } = useContext(ProductsContext);
  console.log(editProduct)
  const { form, errors, handleChange, handleSubmit } = useForm<FormData>({
    title: editProduct.productName,
    price: editProduct.price,
    reposition_point: editProduct.repositionPoint,
    stock: editProduct.stock,
    category: editProduct.category,
    unit: editProduct.measureUnitDescription,
    brand: editProduct.brand,
    barcode: editProduct.barcode,
  });
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const { handleModalChange, handleOpen } = useContext(ModalContext);

  const {
    setFiltersBrand,
    setFiltersCat,
    setMappedCategory,
    setMappedBrand,
    isLoadingBrand,
    isLoadingCat,
    totalPagesBrand,
    totalPagesCategory,
    totalCountBrand,
    totalCountCat,
    mappedCategory,
    mappedBrand,
    setMappedUnits
  } = useContext(SettingsContext)

  const [isCategories, setIsCategories] = useState(false)
  const [isBrand, setIsBrand] = useState(false)
  const [isUnits, setIsUnits] = useState(false)
  const [selectionError, setSelectionError] = useState('');
  const {
    categorySelect,
    brandSelect,
    unitSelect,
    handleNotSelectSetting,
    categorySelectName,
    brandSelectName,
    unitSelectName,
    setEditProduct
  } = useContext(ProductsContext)
  const navigate = useNavigate()
  const [unidades, setUnidades] = useState([])
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const totalCountUnits = useState(5)
  const totalPagesUnits = useState(1)
  const { setShowLoading } = useContext(LoadingContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      setSelectionError('El nombre del producto es requerido');
      return
    }

    if (!form.price) {
      setSelectionError('El precio de venta es requerido');
      return
    }

    if (!form.reposition_point) {
      setSelectionError('El punto de reposición es requerido');
      return
    }

    if (!categorySelect || !unitSelect || !brandSelect) {
      setSelectionError('Debe seleccionar una categoría, una unidad y una marca.');
      return;
    }
    handleModalChange({
      accept: {
        title: 'Editar producto',
        action: async () => {
          try {
            setShowLoading(true);
            const res = await onEditProduct(
              editProduct.id,
              form.title,
              categorySelect,
              unitSelect,
              brandSelect,
              form.reposition_point,
              form.price,
              form.barcode,
            );

            if (res) {
              setShowLoading(false);

              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getProducts();
                    navigate('/productos')
                    handleNotSelectSetting()
                    setEditProduct()
                  },
                },
                title: `${form.title} editado exitósamente`,
                message:
                  'Puede consultar el producto en la tabla de productos.',
              });
              handleOpen();
            }
          } catch ({ errors }) {
            setShowLoading(false);

            switch (errors[0].status) {
              case 404:
                handleModalChange({
                  accept: {
                    title: 'Aceptar',
                    action: () => { },
                  },
                  title: 'Producto no encontrado',
                  message:
                    'El producto que intenta editar no fue encontrado. Intente más tarde',
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
        },
      },
      reject: {
        title: 'Cancelar',
        action: () => { },
      },

      title: `Edición del producto ${form.title}`,
      message: '¿Está seguro que desea editar el producto?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  const handleCategories = () => {
    setIsCategories(true)
    setIsBrand(false)
    setIsUnits(false)
  }

  const handleBrand = () => {
    setIsCategories(false)
    setIsBrand(true)
    setIsUnits(false)
  }

  const getOptions = async () => {
    setIsLoadingUnits(true)
    try {
      const { unidades } = await getUnits();
      if (unidades) {
        setUnidades(unidades);
        setIsLoadingUnits(false)
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleUnits = async () => {
    setIsCategories(false)
    setIsBrand(false)
    setIsUnits(true)
    getOptions()
  }

  return (
    <Box>
      <header className={styles.header}>
        <h2 className={styles.title}>Modificar Producto</h2>
      </header>
      <div className={styles.sectionContainer}>
        <section className={styles.formProduct}>
          <form onSubmit={onSubmit}>
            <div className={styles.infoProduct}>
              <label htmlFor="title" className={styles.modalLabel}>
                Nombre del producto
              </label>
              <input
                type="text"
                name="title"
                className={styles.modalInput}
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className={styles.infoProduct}>
              <label htmlFor="price" className={styles.modalLabel}>
                Precio de venta (ARS)
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
            </div>

            <div className={styles.infoProduct}>
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

              />
            </div>

            <div className={styles.infoProduct}>
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
              />
            </div>

            <div className={styles.infoProduct}>
              <label htmlFor="barcode" className={styles.modalLabel}>
                Codigo de Barra
              </label>
              <input
                type="text"
                name="barcode"
                value={form.barcode}
                className={styles.modalInput}
                onChange={handleChange}
              />
            </div>
            <div className={styles.selectContainer}>

              <div className={styles.infoProductSelectContainer}>
                <div className={styles.optionSelect}>
                  <p style={{ color: '#fff', marginTop: '8px' }}>
                    Categoría seleccionada:
                  </p>
                  {categorySelect && (
                    <strong style={{ color: '#fff', marginTop: '8px' }}>{categorySelectName}</strong>
                  )}
                </div>

                <div className={styles.infoProductSelect}>
                  <button className={categorySelect ? ` ${styles.btnS} ` : `${styles.btnSelect}`} type='button' onClick={handleCategories}> Seleccionar Categoría</button>
                </div>
              </div>

              <div className={styles.infoProductSelectContainer}>
                <div className={styles.optionSelect}>
                  <p style={{ color: '#fff', marginTop: '8px' }}>
                    Unidad seleccionada:
                  </p>
                  {unitSelect && (
                    <strong style={{ color: '#fff', marginTop: '8px' }}>{unitSelectName}</strong>
                  )}
                </div>
                <div className={styles.infoProductSelect}>

                  <button className={unitSelect ? ` ${styles.btnS} ` : `${styles.btnSelect}`} type='button' onClick={handleUnits}> Seleccionar Unidad</button>
                </div>
              </div>

              <div className={styles.infoProductSelectContainer}>
                <div className={styles.optionSelect}>
                  <p style={{ color: '#fff', marginTop: '8px' }}>
                    Marca seleccionada:
                  </p>
                  {brandSelect && (
                    <strong style={{ color: '#fff', marginTop: '8px' }}>{brandSelectName}</strong>
                  )}
                </div>
                <div className={styles.infoProductSelect}>
                  <button className={brandSelect ? ` ${styles.btnS} ` : `${styles.btnSelect}`} type='button' onClick={handleBrand}> Seleccionar Marca</button>
                </div>
              </div>

              {selectionError && (
                <p className={styles.error}>{selectionError}</p>
              )}

            </div>
            <div className={styles.btnBox}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnRegister}`}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={() => {
                  handleModalChange({
                    accept: {
                      title: 'Aceptar',
                      action: () => {
                        getProducts();
                        navigate('/productos')
                        handleNotSelectSetting()
                      },
                    },
                    reject: {
                      title: 'Cancelar',
                      action: () => { },
                    },
                    title: `Cancelar la modificación del producto`,
                    message:
                      '¿Seguro que desea cancelar la modificación del producto?',
                  });
                  handleOpen();
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>


        <section className={styles.selectOptions}>
          {
            isCategories && (
              <TablelSelect
                title={'Categorías'}
                isLoading={isLoadingCat}
                set={setMappedCategory}
                totalPage={totalPagesCategory}
                totalCount={totalCountCat}
                setFilters={setFiltersCat}
                rows={mappedCategory}
                filter={() => { }}
                select={categorySelect}
                buscador={true}
              />
            )

          }

          {
            isBrand && (
              <TablelSelect
                title={'Marcas'}
                isLoading={isLoadingBrand}
                set={setMappedBrand}
                totalPage={totalPagesBrand}
                totalCount={totalCountBrand}
                setFilters={setFiltersBrand}
                rows={mappedBrand}
                filter={() => { }}
                select={brandSelect}
                buscador={true}
              />
            )
          }
          {
            isUnits && (
              <TablelSelect
                title={'Unidades'}
                isLoading={isLoadingUnits}
                set={setMappedUnits}
                totalPage={totalPagesUnits}
                totalCount={totalCountUnits}
                setFilters={() => { }}
                rows={unidades}
                filter={() => { }}
                select={unitSelect}
                buscador={false}
              />
            )
          }
          {
            !(isCategories || isBrand || isUnits) && (
              <div>Debe seleccionar alguna categoría, unidad o marca</div>
            )
          }
        </section>
      </div>
    </Box >
  );
};
