import { createContext, useContext, useRef, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../services/products';
import { ModalContext } from '../modal/ModalContext';
import { mopsusIcons } from '../../icons';

export const ProductsContext = createContext(null);

export const INITIAL_FILTERS = {
  title: '',
  category_id: null,
  unit_id: null,
  below_reposition: null,
  price_min: null,
  price_max: null,
  is_active: true,
  page: 1,
};
export const ProductsProvider = ({ children }) => {
  const [mappedProducts, setMappedProducts] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = useRef(null);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const [editProduct, setEditProduct] = useState(null);
  const getProducts = async (customFilters?) => {
    try {
      setIsLoading(true);
      const { productos, total_pages } = await getAllProducts(
        customFilters ? customFilters : filters
      );
      if (productos) {
        const mapped = productos.map((product) => ({
          id: product.id,
          measureUnitId: product.id_units,
          measureUnitDescription: product.unidad,
          productName: product.title,
          price: product.price,
          stock: product.stock,
          repositionPoint: product.reposition_point,
          category: product.categoria,
          state: product.is_active ? 'Activo' : 'Inactivo',
        }));
        if (totalPages.current === null || totalPages.current !== total_pages) {
          totalPages.current = total_pages;
        }
        setMappedProducts(mapped);
      }
    } catch ({ errors }) {
      console.error(errors);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    const nextPage =
      filters.page + 1 !== totalPages.current + 1
        ? filters.page + 1
        : totalPages.current;
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getProducts({ ...filters, page: nextPage });
  };

  const goToPreviousPage = () => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getProducts({ ...filters, page: nextPage });
  };

  const goToFirstPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    getProducts({ ...filters, page: 1 });
  };

  const goToLastPage = () => {
    if (totalPages.current !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages.current,
      }));
      getProducts({ ...filters, page: totalPages.current });
    }
  };

  const handleSetProductToEdit = (index = null) => {
    if (!index && index != 0) {
      setEditProduct(null);
      return;
    }
    setEditProduct(mappedProducts[index]);
  };

  const deleteProductFromTable = (index) => {
    const productToDelete = mappedProducts[index];
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            const response = await deleteProduct(productToDelete.id);
            if (response) {
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getProducts();
                  },
                },
                title: `"${productToDelete.productName}" dado de baja exitosamente`,
                message:
                  'Puede restaurar el producto desde la tabla de productos.',
              });
              handleOpen();
            }
          } catch (error) {
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: () => { },
              },
              title: `"${productToDelete.productName}" no pudo darse de baja`,
              message:
                'Lo sentimos, no pudimos concretar la opercion. Intente mas tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Dar de baja "${productToDelete.productName}"`,
      message: '¿Está seguro que desea dar de baja el producto?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  return (
    <ProductsContext.Provider
      value={{
        mappedProducts,
        getProducts,
        totalPages,
        isLoading,
        filters,
        goToFirstPage,
        goToNextPage,
        goToPreviousPage,
        goToLastPage,
        setFilters,
        deleteProductFromTable,
        setMappedProducts,
        handleSetProductToEdit,
        editProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
