import { createContext, useContext, useEffect, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../services/products';
import { ModalContext } from '../modal/ModalContext';
import { mopsusIcons } from '../../icons';

export const ProductsContext = createContext(null);

const INITIAL_FILTERS = {
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
  const { handleOpen, handleModalChange } = useContext(ModalContext);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { productos } = await getAllProducts(filters);
      if (productos) {
        const mapped = productos.map((product) => ({
          id: product.id,
          productName: product.title,
          price: product.price,
          stock: product.stock,
          repositionPoint: product.reposition_point,
          category: product.categoria,
          state: product.is_active ? 'Activo' : 'Inactivo',
        }));

        setMappedProducts(mapped);
      }
    } catch ({ errors }) {
      console.error(errors);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductFromTable = (index) => {
    console.log(index);
    console.log(mappedProducts);
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

  useEffect(() => {
    getProducts();
  }, [filters]);

  return (
    <ProductsContext.Provider
      value={{
        mappedProducts,
        getProducts,
        isLoading,
        filters,
        setFilters,
        deleteProductFromTable,
        setMappedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
