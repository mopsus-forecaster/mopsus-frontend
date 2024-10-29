import { createContext, useContext, useState } from 'react';
import { deleteSale, getSale, getSaleById } from '../../services/sales';
import { ModalContext } from '../modal/ModalContext';
import { mopsusIcons } from '../../icons';

export const SaleContext = createContext(null);

export const INITIAL_FILTERS = {
  saleDateStart: null,
  saleDateEnd: null,
  isActive: null,
  orderBy: null,
  orderType: null,
  page: 1,
};

export const SalesProvider = ({ children }) => {
  const [addProduct, setAddProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleOpen, handleModalChange } = useContext(ModalContext);
  const [saleDetails, setSaleDetails] = useState(null)
  const [subTotal, setSubTotal] = useState(null)

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


  const productQuantity = (id, quantity) => {
    setAddProduct((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatDiscount = (discount) => {
    return `${(discount * 100).toFixed(0)}%`;
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
    getSale({ ...filters, page: nextPage });
  };

  const goToPreviousPage = () => {
    const nextPage = filters.page - 1 !== 0 ? filters.page - 1 : 1;

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: nextPage,
    }));
    getSale({ ...filters, page: nextPage });
  };

  const goToFirstPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    getSale({ ...filters, page: 1 });
  };

  const goToLastPage = () => {
    if (totalPages.current !== null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: totalPages.current,
      }));
      getSale({ ...filters, page: totalPages.current });
    }
  };

  const getPaginatedSales = async (customFilters?) => {
    if (!customFilters) {
      try {
        setIsLoading(true);
        const { sales, total_pages } = await getSale(customFilters ? customFilters : filters);
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

  const deleteSaleFromTable = (index) => {
    const saleToDelete = sales[index];
    handleModalChange({
      accept: {
        title: 'Aceptar',
        action: async () => {
          try {
            const response = await deleteSale(saleToDelete.saleId);
            if (response) {
              handleModalChange({
                accept: {
                  title: 'Aceptar',
                  action: () => {
                    getPaginatedSales()
                  },
                },
                title: `Venta n° "${saleToDelete.saleId}" anulada exitosamente`,
                message:
                  '',
              });
              handleOpen();
            }
          } catch (error) {
            handleModalChange({
              accept: {
                title: 'Aceptar',
                action: () => { },
              },
              title: `La venta n°"${saleToDelete.saleId}" no pudo ser anulada`,
              message:
                'Lo sentimos, no pudimos concretar la operción. Intente más tarde',
            });
            handleOpen();
          }
        },
      },
      title: `Anular venta n° "${saleToDelete.saleId}"`,
      message: '¿Está seguro que desea dar de baja la venta?',
      icon: mopsusIcons.warning,
    });
    handleOpen();
  };

  const handleSetSaleToDetails = async (index = null) => {
    if (!index && index !== 0) {
      setSaleDetails(null);
      return;
    }

    const saleDetails = sales[index];

    try {
      const saleSelect = await getSaleById(saleDetails.saleId);

      if (saleSelect) {
        const mappedSale = {
          saleId: saleSelect.sale_id,
          saleDate: formatDate(saleSelect.sale_date),
          isActive: saleSelect.is_active ? 'Activo' : 'Inactivo',
          total: saleSelect.total,
          discount: formatDiscount(saleSelect.discount),
          products: saleSelect.products,
        };
        setSaleDetails(mappedSale);
        console.log(mappedSale)
      }
    } catch (error) {
      console.error('Error al obtener los detalles de la venta:', error);
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
        setFilters,
        setSales,
        totalPages,
        goToFirstPage,
        goToNextPage,
        goToPreviousPage,
        goToLastPage,
        deleteSaleFromTable,
        handleSetSaleToDetails,
        saleDetails,
        setSubTotal,
        subTotal,
        productQuantity
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};
