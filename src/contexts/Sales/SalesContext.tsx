import { createContext, useState } from 'react';
import { getSale } from '../../services/sales';

export const SaleContext = createContext(null);

const INITIAL_FILTERS = {
  saleDateStart: null,
  saleDateEnd: null,
  isActive: null,
  orderBy: null,
  orderType: null,
  page: 1,
};

export const SalesProvider = ({ children }) => {
  const [addProduct, setAddProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const addProductToSale = (product) => {
    const productInSale = addProduct.findIndex(
      (item) => item.id === product.id
    );

    if (productInSale >= 0) {
      const newCart = structuredClone(addProduct);
      newCart[productInSale].quantity = 1;
      setAddProduct(newCart);
      console.log(addProduct);
    } else {
      setAddProduct((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseProductQuantity = (id) => {
    setAddProduct((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseProductQuantity = (id) => {
    setAddProduct((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const removeProductFromSale = (id) => {
    setAddProduct((prevState) => prevState.filter((item) => item.id !== id));
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatDiscount = (discount) => {
    return `${(discount * 100).toFixed(0)}%`; // Multiplica por 100 y elimina decimales con toFixed(0)
  };

  const getPaginatedSales = async (customFilters) => {
    if (!customFilters) {
      try {
        setIsLoading(true);
        const { sales, total_pages } = await getSale(INITIAL_FILTERS);
        if (sales) {
          const mappedSales = sales.map((sale) => ({
            saleId: sale.sale_id,
            saleDate: formatDate(sale.sale_date),
            isActive: sale.is_active ? 'Activo' : 'Inactivo',
            total: sale.total,
            discount: formatDiscount(sale.discount),
          }));
          setSales([...mappedSales]);
          setTotalPages(total_pages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SaleContext.Provider
      value={{
        addProduct,
        setAddProduct,
        addProductToSale,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductFromSale,
        getPaginatedSales,
        isLoading,
        sales,
        filters,
        setSales,
        totalPages,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
