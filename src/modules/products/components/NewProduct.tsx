
import styles from '../styles/products.module.scss';
import { mopsusIcons } from '../../../icons';
import { useForm } from '../../../hooks/useForm';
import { useContext, useState } from 'react';
import { ModalContext } from '../../../contexts/modal/ModalContext';
import {
  addProduct,
  getUnits,
} from '../../../services/products';
import { ProductsContext } from '../../../contexts/Products/ProductsContext';
import { LoadingContext } from '../../../contexts/loading/LoadingContext';
import Box from '../../../shared/box';
import { useNavigate } from 'react-router-dom';
import { TablelSelect } from './TableSelect';
import { SettingsContext } from '../../../contexts/settings/SettingsContext';



interface FormData {
  title: string;
  price: number | string;
  reposition_point: number | string;
  stock: number | string;
  category: string;
  unit: string;
  brand: string;
  barcode: string
}

export const NewProduct = () => {
  const { setStateFrom } = useContext(ProductsContext);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const { setShowLoading } = useContext(LoadingContext);
  const navigate = useNavigate()

  const { form, handleChange } = useForm<FormData>(
    {
      title: '',
      price: '',
      reposition_point: '',
      stock: '',
      category: '',
      unit: '',
      brand: '',
      barcode: '',
    }
  );
  const [isCategories, setIsCategories] = useState(false)
  const [isBrand, setIsBrand] = useState(false)
  const [isUnits, setIsUnits] = useState(false)

  const [unidades, setUnidades] = useState([])

  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const totalCountUnits = useState(5)
  const totalPagesUnits = useState(1)

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
    setMappedUnits,
    filtersBrand,
    filtersCat,
    getCategories,
    getBrand
  } = useContext(SettingsContext)

  const handleNavigation = () => {
    switch (stateFrom) {
      case 'I':
        navigate('/nuevo-ingreso');
        break;
      case 'S':
        navigate('/nueva-venta');
        break;
      case 'A':
        navigate('/nuevo-ajuste');
        break;
      case 'P':
        navigate('/productos');
        break;
    }
  };
  const {
    categorySelect,
    brandSelect,
    unitSelect,
    handleNotSelectSetting,
    categorySelectName,
    brandSelectName,
    unitSelectName,
    stateFrom
  } = useContext(ProductsContext)
  const [selectionError, setSelectionError] = useState('');

  const onSubmit = async (e) => {
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

    try {
      setShowLoading(true);
      const res = await addProduct(
        form.title,
        form.price,
        form.reposition_point,
        form.stock,
        unitSelect,
        categorySelect,
        brandSelect,
        form.barcode
      );

      if (res) {
        setShowLoading(false);
        handleModalChange({
          accept: {
            title: 'Aceptar',
            action: () => {
              handleNavigation()
              handleNotSelectSetting();
              setStateFrom('')
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
              action: () => {
                handleNotSelectSetting()
                handleNavigation()
                setStateFrom('')
              },
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
              action: () => {
                handleNotSelectSetting()
                setStateFrom('')
              },
            },
            title: 'Error técnico',
            message:
              'Lo sentimos, no pudimos completar su solicitud. Intente más tarde',
            icon: mopsusIcons.error,
          });
          handleOpen();
          handleNotSelectSetting();
          handleNavigation()
          setStateFrom('')
          break;
      }
    }
  };
  const handleCloseNewProduct = (e) => {
    e.preventDefault();
    handleNotSelectSetting()
    navigate('/productos')
  }

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
        <h2 className={styles.title}>Registrar Producto</h2>
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
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
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
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div className={styles.infoProduct}>
              <label htmlFor="barcode" className={styles.modalLabel}>
                Codigo de Barra
              </label>
              <input
                type="number"
                name="barcode"
                className={styles.modalInput}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
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
                Registrar Producto
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnCancel}`}
                onClick={handleCloseNewProduct}
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
                get={getCategories}
                set={setMappedCategory}
                totalPage={totalPagesCategory}
                totalCount={totalCountCat}
                setFilters={setFiltersCat}
                rows={mappedCategory}
                filters={filtersCat}
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
                get={getBrand}
                set={setMappedBrand}
                totalPage={totalPagesBrand}
                totalCount={totalCountBrand}
                setFilters={setFiltersBrand}
                rows={mappedBrand}
                filters={filtersBrand}
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
                get={() => { }}
                set={setMappedUnits}
                totalPage={totalPagesUnits}
                totalCount={totalCountUnits}
                setFilters={() => { }}
                rows={unidades}
                filters={() => { }}
                select={unitSelect}
                buscador={false}
              />
            )
          }
          {
            !(isCategories || isBrand || isUnits) && (
              <TablelSelect
                title={'Información sobre categorías, marcas y unidades'}
                isLoading={null}
                get={() => { }}
                set={null}
                totalPage={null}
                totalCount={null}
                setFilters={() => { }}
                rows={mappedBrand}
                filters={() => { }}
                select={() => { }}
                buscador={true}
              />
            )
          }
        </section>
      </div>

    </Box >
  );
};
