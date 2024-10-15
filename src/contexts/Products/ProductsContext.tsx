import { createContext, useEffect, useState } from 'react';
import { getAllProducts } from '../../services/products';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [page] = useState(1);
  const [mappedProducts, setMappedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { productos } = await getAllProducts(page);
      if (productos) {
        const mapped = productos.map((product) => ({
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ mappedProducts, getProducts, isLoading }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
